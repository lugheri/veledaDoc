import { FormEvent, useEffect, useState } from "react"
import api from "../../../services/api";
import { Modal, TitleModal } from "../../../components/Modal";
import { InputForm, SelectForm, TextAreaForm } from "../../../components/Inputs";
import { TextError } from "../../../components/TextError";
import { Button } from "../../../components/Button";
import { ITreatment } from "../../Settings/Modules/Advanced/Dto/treatments.dto";
import { IProfessional } from "../Dto/professional.dto";



type AddProcedureProps = {
  clientId:number;
  close:React.Dispatch<React.SetStateAction<boolean>>
}
export const AddProcedure = (props:AddProcedureProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const [ treatmentId, setTreatmentId ] = useState('')
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ professionalId, setProfessionalId ] = useState('')

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

  const createProcedure = async (e:FormEvent) => {
    e.preventDefault()
    try{    
      const data = {
        clinic_id:props.clientId,
        type_treatment:parseInt(treatmentId),
        name:name,
        description:description,
        professional_id:parseInt(professionalId)
      }
      const r = await api.post('newProcedure',data)
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
        <form className="flex flex-col" onSubmit={(e)=>createProcedure(e)}>
          <TitleModal 
            icon="faPlus"
            title="Adicionar Procedimento"
            subtitle="Cadastre um novo procedimento!"
            close={()=>props.close(false)}/>
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
              empty="Selecione um Tratamento"
              required
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
              empty="Selecione um Profissional"
              required
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
              name="Cadastrar Procedimento"
              submit
              />  
          </div>
        </form>
    }/>
  )
}