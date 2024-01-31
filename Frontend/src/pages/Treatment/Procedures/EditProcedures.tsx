import { FormEvent, useEffect, useState } from "react"
import api from "../../../services/api"
import { Modal, TitleModal } from "../../../components/Modal"
import { InputForm, SelectForm, TextAreaForm } from "../../../components/Inputs"
import { TextError } from "../../../components/TextError"
import { Button } from "../../../components/Button"
import { IProcedure } from "../Dto/procedure.dto"
import { RemoveProcedure } from "./RemoveProcedures"
import { ITreatment } from "../../Settings/Modules/Advanced/Dto/treatments.dto"
import { IProfessional } from "../Dto/professional.dto"


type EditProcedureProps = {
  procedure:IProcedure,
  close:React.Dispatch<React.SetStateAction<IProcedure|null>>
}
export const EditProcedure = (props:EditProcedureProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const [ treatmentId, setTreatmentId ] = useState<string>(props.procedure.type_treatment)
  const [ name, setName ] = useState(props.procedure.name)
  const [ description, setDescription ] = useState(props.procedure.description)
  const [ professionalId, setProfessionalId ] = useState<string|number>(props.procedure.professional_id)
  const [ removeProcedure, setRemoveProcedure ] = useState<IProcedure|null>(null)

  //Items List
  const [ availableTreatments, setAvailableTreatments ] = useState<ITreatment[]|null>(null)
  const getTreatments = async () => {
    try{
      const list = await api.get(`listAvailableTreatments/1`)
      if(list.data.error){setError(list.data.message)
        return
      }
      setAvailableTreatments(list.data.response)
    }catch(err){ console.log("erro",err)
      setError("Ocorreu um erro na requisição dos dados!")
    }
  }
  const [ professionals, setProfessionals ] = useState<IProfessional[]|null>(null)
  const getProfessionals = async () => {
    try{
      const list = await api.get(`listProfessionals/1`)
      if(list.data.error){setError(list.data.message)
        return
      }
      setProfessionals(list.data.response)
    }catch(err){ console.log("erro",err)
      setError("Ocorreu um erro na requisição dos dados!")
    }
  }
  useEffect(()=>{
    getTreatments()
    getProfessionals()
  },[])


  const editProcedure = async (e:FormEvent) => {
    e.preventDefault()
    try{    
      const data = {
        type_treatment:parseInt(treatmentId),
        name:name,
        description:description,
        professional_id:typeof professionalId === 'string' ? parseInt(professionalId) : professionalId
      }
      const r = await api.put(`editProcedure/${props.procedure.id}`,data)
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
        <form className="flex flex-col" onSubmit={(e)=>editProcedure(e)}>
          <TitleModal 
            icon="faSyringe"
            title="Informações do Procedimento"
            subtitle="Exiba ou edite todas as informações do procedimento!"
            close={()=>props.close(null)}/>
            <div className="flex flex-col">
            <InputForm 
              label="Nome"
              value={name}
              onChange={setName}
              required
            />  
            {availableTreatments == null 
            ? ( <p>Carregando</p> )
            : (
            <SelectForm 
              label="Tratamento" 
              dataOptions={availableTreatments}
              labelOption="name"
              valueOption="id"
              value={treatmentId}
              onChange={setTreatmentId}
              />
            )}
            <br/>
            {professionals == null 
            ? ( <p>Carregando</p> )
            : (
            <SelectForm 
              label="Profissional" 
              dataOptions={professionals}
              labelOption="name"
              valueOption="id"
              value={professionalId}
              onChange={setProfessionalId}
              />
            )}
            <br/>
            <TextAreaForm
              label="Descrição"
              value={description}
              onChange={setDescription}
            />

            { removeProcedure && (<RemoveProcedure
                                      procedure={removeProcedure} 
                                      close={setRemoveProcedure}
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
              onClick={()=>setRemoveProcedure(props.procedure)}
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