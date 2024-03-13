import { FormEvent, useState } from "react"
import { IPatient } from "./Dto/patient.dto"
import api from "../../services/api"
import { InputForm } from "../../components/Inputs"
import { Button } from "../../components/Button"
import { TextError } from "../../components/TextError"
import { RemovePatient } from "./RemovePatient"
import { SubTitle } from "../../components/Subtitle"
import { TitlePage } from "../../components/TitlePage"

type EditPatientProps = {
  patient:IPatient,
  close:React.Dispatch<React.SetStateAction<IPatient|null>>
}
export const EditPatient = (props:EditPatientProps) => {
  const [ page, setPage ] = useState<'resumo'|'dados'|'prescricoes'|'procedimentos'|'financeiro'|'documentos'>("resumo")
  return(
    <div className="flex flex-col">
      <TitlePage 
        icon="faFileWaveform" 
        title={`${props.patient.name}`}
        description="Dados do Prontuário do paciente"/>

      <div className="flex ">
        <Button 
          name="Resumo" 
          btn="info" 
          type={page == 'resumo' ? "default" : "notline"} 
          onClick={()=>setPage('resumo')}/>
        <Button 
          name="Informações Pessoais" 
          btn="info" 
          type={page == 'dados' ? "default" : "notline"} 
          onClick={()=>setPage('dados')}/>
        <Button 
          name="Prescrições" 
          btn="info" 
          type={page == 'prescricoes' ? "default" : "notline"} 
          onClick={()=>setPage('prescricoes')}/>
        <Button 
          name="Procedimentos" 
          btn="info" 
          type={page == 'procedimentos' ? "default" : "notline"} 
          onClick={()=>setPage('procedimentos')}/>
        <Button 
          name="Financeiro" 
          btn="info" 
          type={page == 'financeiro' ? "default" : "notline"} 
          onClick={()=>setPage('financeiro')}/>
        <Button 
          name="Documentos" 
          btn="info" 
          type={page == 'documentos' ? "default" : "notline"} 
          onClick={()=>setPage('documentos')}/>
        <Button 
          btn="error"
          type="notline"
          name="Fechar"
          size="sm"
          onClick={()=>props.close(null)}/>
      </div>
      { page == "resumo" ? (<Resumo patient={props.patient} close={props.close}/>)
        : page == "dados" ? (<Dados/>)
        : page == "prescricoes" ? (<Prescricoes/>)
        : page == "procedimentos" ? (<Procedimentos/>)
        : page == "financeiro" ? (<Financeiro/>)    
        : page == "documentos" ? (<Documentos/>) : <p>Erro</p>     
      }
      
    </div> 
  )
}

//Pages
type patientProps = {
  patient:IPatient, 
  close:React.Dispatch<React.SetStateAction<IPatient|null>>
}
export const Resumo = (props:patientProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const [ name, setName ] = useState(props.patient.name)
  const [ removePatient, setRemovePatient ] = useState<IPatient|null>(null)

  const editPatient = async (e:FormEvent) => {
    e.preventDefault()
    try{    
      const data = {
        name:name
      }
      const r = await api.put(`editPatient/${props.patient.id}`,data)
      if(r.data.error){
        setError(r.data.message)
        return
      }
      props.close(null)  
    }catch(err){
      console.log(err)
      setError("Ocorreu um erro durante a requisição!")
    }
  }

  return(
    <div className="flex flex-col bg-white rounded-md shadow p-2">
      <SubTitle icon="faHospitalUser" title="Informações do Paciente"/>
      <div className="bg-white rounded-md border p-2">
        <form className="flex flex-col" onSubmit={(e)=>editPatient(e)}>         
          <InputForm 
            label="Nome"
            value={name}
            onChange={setName}
            required/>               
            { removePatient && (<RemovePatient
                                      patient={removePatient} 
                                      close={setRemovePatient}
                                      closeEdit={props.close}/>)}                  
            
            { error && (<TextError icon="faTriangleExclamation" error={error}/>)}
            <div className="flex justify-end border-t border-slate-200 mt-4 pt-2">           
              <Button 
                btn="error"
                icon="faTrash"
                type="notline"
                name="Remover"
                size="sm"
                onClick={()=>setRemovePatient(props.patient)}
                />
              <Button 
                btn="success"
                icon="faFloppyDisk"              
                name="Salvar Alterações"
                submit
                />  
            </div>
          </form>
      </div>
    </div>
  )
}

export const Dados = () => { 
  return(
    <div className="flex flex-col bg-white rounded-md shadow p-2">
      <SubTitle icon="faAddressCard" title="Dados Pessoais"/>
      <div className="bg-white rounded-md border p-2">
        ...
      </div>
    </div>
  )
}
export const Prescricoes = () => { 
  return(
    <div className="flex flex-col bg-white rounded-md shadow p-2">
      <SubTitle icon="faFilePen" title="Prescricoes"/>
      <div className="bg-white rounded-md border p-2">
        ...
      </div>
    </div>
  )
}
export const Procedimentos = () => { 
  return(
    <div className="flex flex-col bg-white rounded-md shadow p-2">
      <SubTitle icon="faSyringe" title="Procedimentos"/>
      <div className="bg-white rounded-md border p-2">
        ...
      </div>
    </div>
  )
}
export const Financeiro = () => { 
  return(
    <div className="flex flex-col bg-white rounded-md shadow p-2">
    <SubTitle icon="faFileInvoiceDollar" title="Financeiro"/>
      <div className="bg-white rounded-md border p-2">
        ...
      </div>
    </div>
  )
}
export const Documentos = () => { 
  return(
    <div className="flex flex-col bg-white rounded-md shadow p-2">
      <SubTitle icon="faFileLines" title="Documentos"/>
      <div className="bg-white rounded-md border p-2">
        ...
      </div>
    </div>
  )
}