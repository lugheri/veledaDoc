import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IComponentsContract, IContract } from "../Dto/contracts.dto";
import api from "../../../../../services/api";
import { TitlePage } from "../../../../../components/TitlePage";
import { Loading } from "../../../../../components/Loading";
import { Button } from "../../../../../components/Button";
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { Modal, TitleModal } from "../../../../../components/Modal";



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
                  <Contract contract={infoContract} addItemContract={addItemContract} editItemContract={editItemContract}/>
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
}
const Contract : React.FC<IContractComponent> = (props) => {
  const [ listComponents, setListComponents ] = useState<null|IComponentsContract[]>(null) 
  const getComponents = async () => {
    try{
      const r = await api.get(`listComponents/${props.contract.id}`)
      console.log(r.data)
      setListComponents(r.data.response)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{getComponents()},[props.addItemContract,props.editItemContract])
  return(
    <div className="flex flex-col p-2">
      { listComponents == null ? <Loading/> :
      listComponents.length == 0 ? <p>Contrato Vazio</p>
      : listComponents.map((component,key)=>
        <div className="" key={key}>
          {component.content}
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
  const addComponent = async (type:string) => {
    try{
      const data = {
        contract_id:props.contract.id,
        type:type,
        content:"",
        image:0
      }
      const resp = await api.post('newComponent',data)
      console.log('res',resp)
      const componentId:number = resp.data.response
      props.close(false)
      props.editItem(componentId)
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
  return(
    <Modal component={
      <div className="flex flex-col">
        <TitleModal 
          icon="faEdit" 
          title="Editar Item" 
          subtitle="Edite os dados deste item"
          close={()=>props.close(null)}/>
          <p>Item Id : {props.itemId}</p>
        <div className="flex justify-end border-t border-slate-200 pt-2 mt-2">
          <Button name="Fechar" btn="muted" type="notline" onClick={()=>props.close(null)}/>
        </div>
      </div>}/>
  )
}