import { useState } from "react"
import { IPatient } from "./Dto/patient.dto"
import api from "../../services/api"
import { Modal, TitleModal } from "../../components/Modal"
import { TextError } from "../../components/TextError"
import { Button } from "../../components/Button"

type RemovePatientProps = {
  patient:IPatient,
  closeEdit:React.Dispatch<React.SetStateAction<IPatient|null>>,
  close:React.Dispatch<React.SetStateAction<IPatient|null>>
}
export const RemovePatient = (props:RemovePatientProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const remove = async () => {
    try{    
      const data = {
        status:0,
      }
      const r = await api.put(`editPatient/${props.patient.id}`,data)
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
            title="Remover Paciente"
            close={()=>props.close(null)}/>           
          <div className="flex flex-col p-4">
            <p>Deseja remover o paciente 
                <span className="font-bold text-red-500"> {props.patient.name}</span>?</p> 
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