import { FormEvent, useState } from "react"
import { Modal, TitleModal } from "../../../../../../components/Modal"
import { Button } from "../../../../../../components/Button"
import { InputForm, TextAreaForm } from "../../../../../../components/Inputs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faFileCircleCheck, faFileContract } from "@fortawesome/free-solid-svg-icons"
import { EditClausule } from "./EditClausule"
import { TextError } from "../../../../../../components/TextError"
import api from "../../../../../../services/api"


type AddTreatmentProps = {
  close:React.Dispatch<React.SetStateAction<boolean>>
}
export const AddTreatment = (props:AddTreatmentProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ clausule, setClausule ] = useState("")
  const [ editClausule, setEditClausule ] = useState(false)


  const createTreatment = async (e:FormEvent) => {
    e.preventDefault()
    try{    
      const data = {
        name:name,
        description:description,
        clausule:clausule
      }
      const r = await api.post('newAvailableTreatment',data)
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
        <form className="flex flex-col" onSubmit={(e)=>createTreatment(e)}>
          <TitleModal 
            icon="faPlus"
            title="Adicionar Tratamento"
            subtitle="Cadastre um novo tipo de tratamento!"
            close={()=>props.close(false)}/>
          <div className="flex flex-col">
            <InputForm 
              label="Nome"
              value={name}
              onChange={setName}
              required
            />  
            <TextAreaForm 
              label="Descrição"
              value={description}
              onChange={setDescription}
            />  

            { clausule === "" ? (
              <div 
                className="flex justify-center items-center shadow-md cursor-pointer hover:bg-slate-100
                          bg-white shadow-slate-300 border rounded p-2"
                onClick={()=>setEditClausule(true)}>
                <FontAwesomeIcon className="text-2xl opacity-40 px-2" icon={faFileContract}/>
                <div className="flex flex-col justify-center items-start">
                  <p className="text-slate-500">
                    Nenhuma Cláusula Configurada
                  </p> 
                  <p className="text-slate-500 text-xs">
                    Configure as cláusulas contratuais deste tratamento
                  </p> 
                </div>                
              </div>
            ) : (
              <div 
                className="flex justify-between items-center shadow-md cursor-pointer hover:bg-green-200/80
                          bg-green-100/50 shadow-slate-300 border border-green-500 rounded p-2"
                onClick={()=>setEditClausule(true)}>
                <FontAwesomeIcon className="text-2xl text-green-500/80 px-2" icon={faFileCircleCheck}/>
                <div className="flex flex-col justify-center items-start">
                  <p className="text-green-600">
                    Cláusula Configurada
                  </p> 
                  <p className="text-green-800 text-xs">
                    Clique para ver ou editar
                  </p> 
                </div>  
                <FontAwesomeIcon className="text-2xl text-green-500/40 px-2" icon={faEdit}/>        
              </div>
            )}
            
            { editClausule && (<EditClausule 
                                textClausule={clausule} 
                                editClausule={setClausule} 
                                close={setEditClausule} />)}
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
              icon="faPlus"
              name="Criar Tratamento"
              submit
              />  
          </div>
        </form>
    }/>
  )
}