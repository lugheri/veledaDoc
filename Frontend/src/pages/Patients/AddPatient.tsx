import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { InputForm } from "../../components/Inputs";
import { Modal, TitleModal } from "../../components/Modal";
import { TextError } from "../../components/TextError";
import api from "../../services/api";




type AddPatientProps = {
  clientId:number;
  close:React.Dispatch<React.SetStateAction<boolean>>
}
export const AddPatient = (props:AddPatientProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const [ name, setName ] = useState("")

  const createPacient = async (e:FormEvent) => {
    e.preventDefault()
    try{    
      const data = {
        clinic_id:props.clientId,
        name:name
      }
      const r = await api.post('newPatient',data)
      if(r.data.error){
        setError(r.data.message)
        return
      }
      props.close(false)  
    }catch(err){
      console.log(err)
      setError("Ocorreu um erro durante a requisição!")
    }
  }
  return(
    <Modal 
    component={
        <form className="flex flex-col" onSubmit={(e)=>createPacient(e)}>
          <TitleModal
            icon="faUserPlus"
            title="Adicionar Paciente"
            subtitle="Cadastre um novo paciente!"
            close={()=>props.close(false)}/>
          <div className="flex flex-col">
            <InputForm 
              label="Nome"
              value={name}
              onChange={setName}
              required
            />             
          </div> 
          { error && (<TextError icon="faTriangleExclamation" error={error}/>)}
          <div className="flex justify-end border-t border-slate-200 mt-4 pt-2">
            <Button 
              btn="muted"
              type="notline"
              name="Cancelar"
              size="sm"
              onClick={()=>props.close(false)}
              />
            <Button 
              btn="info"
              icon="faUserPlus"
              name="Cadastrar Profissional"
              submit
              />  
          </div>
        </form>
    }/>
  )
}