import { useEffect, useState, useRef, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IComponentsContract, IContract } from "../../Dto/contracts.dto";
import api from "../../../../../../services/api";
import { TitlePage } from "../../../../../../components/TitlePage";
import { Loading } from "../../../../../../components/Loading";
import { Button } from "../../../../../../components/Button";
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { Modal, TitleModal } from "../../../../../../components/Modal";
import { InputForm, TextAreaForm } from "../../../../../../components/Inputs";
import SignaturePad from "react-signature-canvas";
import ReactSignatureCanvas from "react-signature-canvas";



export const OpenContract  = () => {
  const { contract_id } = useParams();
  const [ infoContract, setInfoContract ] = useState<null|IContract>(null)
  const [ error, setError ] = useState("")
  const getInfoContract = async () => {
    try{
      const info = await api.get(`infoContract/${contract_id}`)
      console.log(info.data)
      if(info.data.error){
        setError(info.data.message)
        return
      }
      setInfoContract(info.data.response)
    }catch(err){console.log(err)}
  }
  useEffect(()=>{getInfoContract()},[])

  const navigate = useNavigate();
  const advancedSetings = () => {
    const route = `/settings/advanced/`
    navigate(route)
  }
  const contentPDF = useRef<HTMLDivElement>(null)
  const options:any = {
    method: 'open',
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
   }
  }

  const [ addItemContract, setAddItemContract ] = useState(false)
  const [ editItemContract, setEditItemContract ] = useState<null|number>(null)
  return(
    <div className="flex flex-col">
      <TitlePage icon="faFileSignature" title="Configure do Contrato" 
      description="Configure todas as informações do contrato para geração do pdf!"
      rightComponent={<Button name="Fechar Contato" btn="muted" onClick={()=>advancedSetings()}/>}/>
      { infoContract === null 
      ? error 
        ? <p className="text-red-500">{error}</p> 
        : <Loading/>
      : <div className="flex flex-col"> 
          {/*Title Contract*/}
          <div className="flex justify-between items-center bg-white rounded-md shadow p-2 mt-1">
            <div className="flex flex-col">
              <p className="text-xl font-semibold">{infoContract.name}</p>
              <p className="font-light">{infoContract.description}</p>
            </div>
          </div>
          {/*Body Contract */}
          <div className="flex">
            <div className="flex flex-col flex-1 bg-slate-400 rounded-md shadow p-2 mt-1 mr-1">
              <div className="bg-white shadow-md shadow-slate-900/30">
                <div ref={contentPDF}>
                  <Contract 
                    contract={infoContract} 
                    addItemContract={addItemContract} 
                    editItemContract={editItemContract}
                    setEditItem={setEditItemContract}/>
                </div>  
              </div>  
              <Button 
                className="mt-4" 
                icon="faPlusCircle"
                name="Adicionar Item" 
                btn="light" 
                type="notline" 
                onClick={()=>setAddItemContract(true)}/>
            </div>
            <div className="flex flex-col w-1/5 bg-white rounded-md shadow p-2 mt-1">
              <Button name="Cabeçário e Rodape" btn="info" onClick={()=>generatePDF(contentPDF, options)}/>
              <Button name="Preview" btn="info" onClick={()=>generatePDF(contentPDF, options)}/>
            </div>
          </div>
          { addItemContract && <AddItem contract={infoContract} close={setAddItemContract} editItem={setEditItemContract} />}
          { editItemContract && <EditItem itemId={editItemContract} contract={infoContract} close={setEditItemContract} />}
      </div> }    
    </div>
  )
}

interface IContractComponent {
  contract:IContract
  addItemContract:boolean
  editItemContract:number|null
  setEditItem:React.Dispatch<React.SetStateAction<number|null>>,
}
const Contract : React.FC<IContractComponent> = (props) => {
  const [ listComponents, setListComponents ] = useState<null|IComponentsContract[]>(null) 
  const [ error, setError ] = useState<null|string>(null) 
  const getComponents = async () => {
    try{
      const r = await api.get(`listComponents/${props.contract.id}`)
      if(r.data.error){
        setError(r.data.message)
      }else{
        setListComponents(r.data.response)
      }
    }catch(e){
      console.log(e)
    }
  }
  const [ removeComponent, setRemoveComponent ] = useState(false)
  const removerComponent = async (componentId:number) => {
    try{
      const data = {
        status:0
      }
      const r = await api.patch(`editComponent/${componentId}`,data)
      if(r.data.error){
        setError(r.data.message)
      }
      setRemoveComponent(!removeComponent)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{getComponents()},[props.addItemContract,props.editItemContract,removeComponent])
  return(
    <div className="flex flex-col p-2">
      { error !== null ? <p className="text-red-500 w-full text-center">{error}</p>
      : listComponents == null ? <Loading/>
      : listComponents.length == 0 ? <p>Contrato Vazio</p>
      : listComponents.map((component,key)=>
        <div 
          key={key}
          className="hover:bg-slate-50 hover:rounded-md hover:shadow-md hover:shadow-slate-300 hover:p-4 mt-[.5px] cursor-pointer relative group/component"
          title={`Editar ${component.type}`}>
            <p className="capitalize font-semibold text-slate-400 text-sm group-hover/component:block hidden">{component.type}</p>
            { component.type == 'subtitulo' ? <p className="font-bold text-lg mt-2 mb-1">{component.content}</p> 
            : component.type == 'assinatura' ? <img src={component.content} alt="Assinatura" style={{display: "block",margin: "0 auto",width: "150px"}}/>
            : component.content}
            <p>{error}</p>
            <div className="hidden group-hover/component:flex justify-center items-center absolute right-0 top-0">
              <Button icon="faArrowUp" title="Mover Acima" btn="muted" type="notline" size="sm"/>
              <Button icon="faArrowDown" title="Mover Abaixo" btn="muted" type="notline" size="sm"/>
              <Button icon="faEdit" title="Editar" btn="info" type="notline" size="sm" onClick={()=>props.setEditItem(component.id)} />
              <Button icon="faTrash" title="Remover" btn="error" type="notline" size="sm"  onClick={()=>removerComponent(component.id)}/>
            </div>
        </div>
      )}
    </div>
  )
}

interface IAddItemComponent {
  close:React.Dispatch<React.SetStateAction<boolean>>,
  editItem:React.Dispatch<React.SetStateAction<number|null>>,
  contract:IContract
}
const AddItem : React.FC<IAddItemComponent> = (props) => {
  const [ error, setError ] = useState<null|string>(null)
  const addComponent = async (type:string) => {
    try{
      const data = {
        contract_id:props.contract.id,
        type:type,
        content:"",
        image:0
      }
      const resp = await api.post('newComponent',data)  
      if(resp.data.error){
        setError(resp.data.message)
      }else{  
        const componentId:number = resp.data.response
        props.close(false)
        props.editItem(componentId)
      }
    }catch(e){
      console.log(e)
    }
  }
  return(
    <Modal component={
      <div className="flex flex-col">
        <TitleModal 
          icon="faPlusCircle" 
          title="Adicionar Item" 
          subtitle="Selecione um tipo de item para incluir no contrato"
          close={()=>props.close(false)}/>
          {error != null && <p className="text-red-500">{error}</p>}
          <Button icon="faFileContract" name="Título do Contrato" btn="info"  onClick={()=>addComponent('titulo')}/>
          <Button icon="faT" name="Subtítulo" btn="info"  onClick={()=>addComponent('subtitulo')}/>
          <Button icon="faQuoteLeft" name="Cláusula" btn="info" onClick={()=>addComponent('clausula')}/>
          <Button icon="faAddressCard" name="Bloco de Dados" btn="info" onClick={()=>addComponent('dados')}/>
          <Button icon="faImage" name="Imagem" btn="info" onClick={()=>addComponent('imagem')}/>
          <Button icon="faTableList" name="Formulário" btn="info" onClick={()=>addComponent('formulario')}/>
          <Button icon="faSignature" name="Assinatura" btn="info" onClick={()=>addComponent('assinatura')}/>
        <div className="flex justify-end border-t border-slate-200 pt-2 mt-2">
          <Button name="Fechar" btn="muted" type="notline" onClick={()=>props.close(false)}/>
        </div>
      </div>}/>
  )
}

interface IEditItemComponent {
  close:React.Dispatch<React.SetStateAction<number|null>>,
  itemId:number,
  contract:IContract
}
const EditItem : React.FC<IEditItemComponent> = (props) => {
  const [ error, setError ] = useState<null|string>(null)
  const [ infoComponent, setInfoComponent ] = useState<null|IComponentsContract>(null)
  const getInfoComponent = async () => {
    try{
      const i = await api.get(`infoComponent/${props.itemId}`)
      if(i.data.error){
        setError(i.data.message)
      }else{
        setInfoComponent(i.data.response)
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{getInfoComponent()},[])
  return(
    <Modal component={
      <div className="flex flex-col">
        <TitleModal 
          icon="faEdit" 
          title="Editar Item" 
          subtitle="Edite os dados deste item"
          close={()=>props.close(null)}/>
        {error !=null && <p className="text-red-500 w-full text-center">{error}</p>}
        { infoComponent === null ? <Loading/> 
        : infoComponent.type == 'titulo' ? <TitleComponentContract titleContract={props.contract.name} component={infoComponent} close={props.close}/>
        : infoComponent.type == 'subtitulo' ? <SubtitleComponentContract component={infoComponent} close={props.close}/>
        : infoComponent.type == 'clausula' ? <ClausuleComponentContract component={infoComponent} close={props.close}/>
        : infoComponent.type == 'dados' ? <DataComponentContract component={infoComponent} close={props.close}/>
        : infoComponent.type == 'imagem' ? <ImageComponentContract component={infoComponent} close={props.close}/>
        : infoComponent.type == 'formulario' ? <FormComponentContract component={infoComponent} close={props.close}/>
        : infoComponent.type == 'assinatura' ? <SignatureContract component={infoComponent} close={props.close}/>
        : <div className="flex flex-col">
            <p>Tipo de Dados não identificado!</p>
            <div className="flex justify-end border-t border-slate-200 pt-2 mt-2">
              <Button name="Fechar" btn="muted" type="notline" onClick={()=>props.close(null)}/>
            </div>
          </div>}        
      </div>}/>
  )
}

//Setup Data Contract
interface IPropsTitleComponentContract{
  component:IComponentsContract,
  titleContract:string,
  close:React.Dispatch<React.SetStateAction<number|null>>
}
//Title
const TitleComponentContract : React.FC<IPropsTitleComponentContract> = (props) => {
  const [ titulo, setTitulo ] = useState("")
  const [ error, setError ] = useState<null|string>(null)
  //Data Component Contract

  const getInfoComponent = async () => {
    try{
      const i = await api.get(`infoComponent/${props.component.id}`)
      if(i.data.error){
        setError(i.data.message)
      }else{
        const infoComponent:IComponentsContract = i.data.response
        setTitulo(infoComponent.content == "" ? props.titleContract : infoComponent.content)
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    getInfoComponent()
  },[])
  const salvarSubtitulo = async (e:FormEvent) => {
    e.preventDefault()
    try{
      const data = {
        content:titulo
      }
      const r = await api.patch(`editComponent/${props.component.id}`,data)
      if(r.data.error){
        setError(r.data.message)
      }else{
        props.close(null)
      }
    }catch(e){
      console.log(e)
    }
  }
  return(
    <form className="flex flex-col" onSubmit={(e)=>salvarSubtitulo(e)}>
      <InputForm label="Título" value={titulo} onChange={setTitulo} required/>
      {error !=null && <p className="text-red-500 w-full text-center">{error}</p>}
      <div className="flex justify-end border-t border-slate-200 pt-2 mt-2">
        <Button name="Fechar" btn="muted" type="notline" onClick={()=>props.close(null)}/>
        <Button name="Salvar Título" btn="success" icon="faFloppyDisk" submit/>
      </div>
    </form>)
}

//Setup Data Contract
interface IPropsComponentContract{
  component:IComponentsContract
  close:React.Dispatch<React.SetStateAction<number|null>>
}
//Subtitle
const SubtitleComponentContract : React.FC<IPropsComponentContract> = (props) => {
  const [ subtitulo, setSubtitulo ] = useState("")
  const [ error, setError ] = useState<null|string>(null)
  //Data Component Contract
  const getInfoComponent = async () => {
    try{
      const i = await api.get(`infoComponent/${props.component.id}`)
      if(i.data.error){
        setError(i.data.message)
      }else{
        const infoComponent:IComponentsContract = i.data.response
        setSubtitulo(infoComponent.content)
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{getInfoComponent()},[])
  const salvarSubtitulo = async (e:FormEvent) => {
    e.preventDefault()
    try{
      const data = {
        content:subtitulo
      }
      const r = await api.patch(`editComponent/${props.component.id}`,data)
      if(r.data.error){
        setError(r.data.message)
      }else{
        props.close(null)
      }
    }catch(e){
      console.log(e)
    }
  }
  return(
    <form className="flex flex-col" onSubmit={(e)=>salvarSubtitulo(e)}>
      <InputForm label="Subtitulo" value={subtitulo} onChange={setSubtitulo} required/>
      {error !=null && <p className="text-red-500 w-full text-center">{error}</p>}
      <div className="flex justify-end border-t border-slate-200 pt-2 mt-2">
        <Button name="Fechar" btn="muted" type="notline" onClick={()=>props.close(null)}/>
        <Button name="Salvar Título" btn="success" icon="faFloppyDisk" submit/>
      </div>
    </form>)
}

//Clausule
const ClausuleComponentContract : React.FC<IPropsComponentContract> = (props) => {
  const [ clausula, setCalausula ] = useState("")
  const [ error, setError ] = useState<null|string>(null)
  //Data Component Contract
  const getInfoComponent = async () => {
    try{
      const i = await api.get(`infoComponent/${props.component.id}`)
      if(i.data.error){
        setError(i.data.message)
      }else{
        const infoComponent:IComponentsContract = i.data.response
        setCalausula(infoComponent.content)
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{getInfoComponent()},[])
  const salvarSubtitulo = async (e:FormEvent) => {
    e.preventDefault()
    try{
      const data = {
        content:clausula
      }
      const r = await api.patch(`editComponent/${props.component.id}`,data)
      if(r.data.error){
        setError(r.data.message)
      }else{
        props.close(null)
      }
    }catch(e){
      console.log(e)
    }
  }
  return(
    <form className="flex flex-col" onSubmit={(e)=>salvarSubtitulo(e)}>
      <TextAreaForm label="Cláusula" value={clausula} onChange={setCalausula} required/>
      {error !=null && <p className="text-red-500 w-full text-center">{error}</p>}
      <div className="flex justify-end border-t border-slate-200 pt-2 mt-2">
        <Button name="Fechar" btn="muted" type="notline" onClick={()=>props.close(null)}/>
        <Button name="Salvar Cláusula" btn="success" icon="faFloppyDisk" submit/>
      </div>
    </form>)
}
//Data
const DataComponentContract : React.FC<IPropsComponentContract> = (props) => {
  return(<div><p>Item: {props.component.type}</p></div>)
}
//Image
const ImageComponentContract : React.FC<IPropsComponentContract> = (props) => {
  return(<div><p>Item: {props.component.type}</p></div>)
}
//Form
const FormComponentContract : React.FC<IPropsComponentContract> = (props) => {
  return(<div><p>Item: {props.component.type}</p></div>)
}
//Signature
const SignatureContract : React.FC<IPropsComponentContract> = (props) => {
  const [ error, setError ] = useState<null|string>(null)
  //const [imageURL, setImageURL] = useState<string | null>(null); // create a state that will contain our image url
  const sigCanvas = useRef<ReactSignatureCanvas | null>(null);
  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };
  const salvarAssinatura = async () => {  
    if (sigCanvas.current) {
      //setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
      try{
        const data = {
          content:sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        }
        const r = await api.patch(`editComponent/${props.component.id}`,data)
        if(r.data.error){
          setError(r.data.message)
        }else{
          props.close(null)
        }
      }catch(e){
        console.log(e)
      }
    }
  }


  return(
    <div className="flex flex-col">
      <div className="flex border">
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className: "w-[500px]"
          }}
        />      
    </div>
      <div className="flex justify-end border-t border-slate-200 pt-2 mt-2">
        { error && <p className="text-center w-full text-red-500">{error}</p>}
        <Button name="Fechar" btn="muted" type="notline" onClick={()=>props.close(null)}/>
        <Button name="Apagar" btn="error" icon="faEraser" type="notline" onClick={()=>clearSignature()}/>
        <Button name="Salvar Assinatura" btn="success" icon="faFloppyDisk" onClick={()=>salvarAssinatura()}/>
      </div>
    </div>
  )
}