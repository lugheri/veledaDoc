import { FormEvent, useState } from "react"
import api from "../../../services/api";
import { Modal, TitleModal } from "../../../components/Modal";
import { InputForm } from "../../../components/Inputs";
import { TextError } from "../../../components/TextError";
import { Button } from "../../../components/Button";



type AddProfessionalProps = {
  clientId:number;
  close:React.Dispatch<React.SetStateAction<boolean>>
}
export const AddProfessional = (props:AddProfessionalProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const [ name, setName ] = useState("")

  const createProfessional = async (e:FormEvent) => {
    e.preventDefault()
    try{    
      const data = {
        clinic_id:props.clientId,
        name:name
      }
      const r = await api.post('newProfessional',data)
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
        <form className="flex flex-col" onSubmit={(e)=>createProfessional(e)}>
          <TitleModal 
            icon="faUserPlus"
            title="Adicionar Profissional"
            subtitle="Cadastre um novo profissional/especialista!"
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