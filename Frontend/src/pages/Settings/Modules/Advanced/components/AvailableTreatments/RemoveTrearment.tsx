import { useState } from "react"
import { Modal, TitleModal } from "../../../../../../components/Modal"
import { ITreatment } from "../../Dto/treatments.dto"
import api from "../../../../../../services/api"
import { TextError } from "../../../../../../components/TextError"
import { Button } from "../../../../../../components/Button"

type RemoveTreatmentProps = {
  treatment:ITreatment,
  closeEdit:React.Dispatch<React.SetStateAction<ITreatment|null>>,
  close:React.Dispatch<React.SetStateAction<ITreatment|null>>
}
export const RemoveTreatment = (props:RemoveTreatmentProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const remove = async () => {
    try{    
      const data = {
        status:0,
      }
      const r = await api.put(`editAvailableTreatment/${props.treatment.id}`,data)
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
            title="Remover Tratamento"
            close={()=>props.close(null)}/>           
          <div className="flex flex-col p-4">
            <p>Deseja remover o tratamento 
                <span className="font-bold text-red-500"> {props.treatment.name}</span>?</p> 
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