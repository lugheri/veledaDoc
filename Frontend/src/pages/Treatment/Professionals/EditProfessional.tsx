import { FormEvent, useState } from "react"
import { IProfessional } from "../Dto/professional.dto"
import api from "../../../services/api"
import { Modal, TitleModal } from "../../../components/Modal"
import { InputForm } from "../../../components/Inputs"
import { RemoveProfessional } from "./RemoveProfessional"
import { TextError } from "../../../components/TextError"
import { Button } from "../../../components/Button"


type EditProfessionalProps = {
  professional:IProfessional,
  close:React.Dispatch<React.SetStateAction<IProfessional|null>>
}
export const EditProfessional = (props:EditProfessionalProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const [ name, setName ] = useState(props.professional.name)
  const [ removeProfessional, setRemoveProfessional ] = useState<IProfessional|null>(null)


  const editProfessional = async (e:FormEvent) => {
    e.preventDefault()
    try{    
      const data = {
        name:name
      }
      const r = await api.put(`editProfessional/${props.professional.id}`,data)
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
    <Modal 
      component={
        <form className="flex flex-col" onSubmit={(e)=>editProfessional(e)}>
          <TitleModal 
            icon="faUserDoctor"
            title="Informações do Profissional"
            subtitle="Exiba ou edite todas as informações do profissional!"
            close={()=>props.close(null)}/>
            <div className="flex flex-col">
            <InputForm 
              label="Nome"
              value={name}
              onChange={setName}
              required
            />  
             
            { removeProfessional && (<RemoveProfessional
                                      professional={removeProfessional} 
                                      close={setRemoveProfessional}
                                      closeEdit={props.close}/>)}                    
          </div> 
          { error && (<TextError icon="faTriangleExclamation" error={error}/>)}
          <div className="flex justify-end border-t border-slate-200 mt-4 pt-2">
            <Button 
              btn="muted"
              type="notline"
              name="Fechar"
              size="sm"
              onClick={()=>props.close(null)}
              />
            <Button 
              btn="error"
              icon="faTrash"
              type="notline"
              name="Remover"
              size="sm"
              onClick={()=>setRemoveProfessional(props.professional)}
              />
            <Button 
              btn="success"
              icon="faFloppyDisk"              
              name="Salvar Alterações"
              submit
              />  
          </div>
        </form>
    }/>
  )
}