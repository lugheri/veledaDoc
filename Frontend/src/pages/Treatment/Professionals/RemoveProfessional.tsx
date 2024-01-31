import { useState } from "react"
import api from "../../../services/api"
import { Modal, TitleModal } from "../../../components/Modal"
import { IProfessional } from "../Dto/professional.dto"
import { TextError } from "../../../components/TextError"
import { Button } from "../../../components/Button"


type RemoveProfessionalProps = {
  professional:IProfessional,
  closeEdit:React.Dispatch<React.SetStateAction<IProfessional|null>>,
  close:React.Dispatch<React.SetStateAction<IProfessional|null>>
}
export const RemoveProfessional = (props:RemoveProfessionalProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const remove = async () => {
    try{    
      const data = {
        status:0,
      }
      const r = await api.put(`editProfessional/${props.professional.id}`,data)
      if(r.data.error){
        setError(r.data.message)
        return
      }
      props.closeEdit(null)
      props.close(null)  
    }catch(err){
      console.log(err)
      setError("Ocorreu um erro durante a requisição!")
    }
  }
  return(
    <Modal 
      component={
        <div className="flex flex-col">
          <TitleModal 
            icon="faTrash"
            title="Remover Especialista"
            close={()=>props.close(null)}/>           
          <div className="flex flex-col p-4">
            <p>Deseja remover o profissional 
                <span className="font-bold text-red-500"> {props.professional.name}</span>?</p> 
          </div> 
          { error && (<TextError icon="faTriangleExclamation" error={error}/>)}
          <div className="flex justify-end border-t border-slate-200 mt-4 pt-2">
            <Button 
              btn="muted"
              type="notline"
              name="Não"
              onClick={()=>props.close(null)}
              />
            <Button 
              btn="error"
              icon="faTrash"
              name="Sim, Remover"
              onClick={()=>remove()}
              />            
          </div>
        </div>
    }/>
  )
}