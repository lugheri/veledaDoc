import { FormEvent, useState } from "react"
import api from "../../../services/api";
import { Modal, TitleModal } from "../../../components/Modal";
import { InputForm, SelectForm } from "../../../components/Inputs";
import { TextError } from "../../../components/TextError";
import { Button } from "../../../components/Button";
import moment from "moment";

type AddProfessionalProps = {
  clinicId:number;
  close:React.Dispatch<React.SetStateAction<boolean>>
}
export const AddProfessional = (props:AddProfessionalProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const today = moment()
  const [ hire_date, setHire_date ] = useState(today.format('YYYY-MM-DD'))
  const [ name, setName ] = useState("")
  const [ gender, setGender ] = useState('')
  const [ marital_status, setMarital_status ] = useState('')
  const [ crm, setCrm ] = useState('')
  const [ document_type, setDocument_type ] = useState('')
  const [ document, setDocument ] = useState('')
  const [ number_cell, setNumber_cell ] = useState('')
  const [ number_additional, setNumber_additional ] = useState('')
  const [ email, setEmail ] = useState('')
  

  const createProfessional = async (e:FormEvent) => {
    e.preventDefault()
    try{    
      const data = {
        clinic_id:props.clinicId,
        hire_date:hire_date,
        name:name,
        gender:gender,
        marital_status:marital_status,
        crm:crm,
        document_type:document_type,
        document:document,
        number_cell:number_cell,
        number_additional:number_additional,
        email:email
      }
      const r = await api.post('newProfessional',data)
      if(r.data.error){
        setError(r.data.message)
        return
      }
      props.close(false)  
    }catch(err:any){
      console.log(err)
      setError(`Ocorreu um erro durante a requisição! ${err.message}`)
    }
  }

  //Options list
  const genterList = [
    {"label":"","value":""},
    {"label":"Masculino","value":"M"},
    {"label":"Feminino","value":"F"}
  ]
  const maritalStatus = [
    {"status":""},
    {"status":"Solteiro(a)"},
    {"status":"Casado(a)"},
    {"status":"Viúvo(a)"},
    {"status":"Divorciado(a)"},
    {"status":"Separado(a)"},
    {"status":"União estável"}
  ]
  const documentType = [
    {"doc":""},
    {"doc":"CPF"},
    {"doc":"RG"},
    {"doc":"CNH"}
  ]
  return(
    <Modal 
    className="w-full"
    component={
        <form className="flex flex-col" onSubmit={(e)=>createProfessional(e)}>
          <TitleModal 
            icon="faUserPlus"
            title="Adicionar Profissional"
            subtitle="Cadastre um novo profissional/especialista!"
            close={()=>props.close(false)}/>

          <div className="flex">
            <div className="w-1/4 mx-1">
              <InputForm 
                inputType="date"
                label="Data de Inicio"
                value={hire_date}
                onChange={setHire_date}
                required/>   
            </div>           
          </div>  

          <div className="flex flex-col">
            <InputForm 
              label="Nome do Profissional"
              value={name}
              onChange={setName}
              required
            />             
          </div> 

          <div className="flex mb-1">
            <div className="flex flex-col mx-1 flex-1">
              <SelectForm
                label="Gênero"
                dataOptions={genterList}
                valueOption="value"
                labelOption="label"
                value={gender}
                onChange={setGender}/>
            </div> 
            <div className="flex flex-col mx-1 flex-1">
              <SelectForm
                label="Estado Civil"
                dataOptions={maritalStatus}
                valueOption="status"
                labelOption="status"
                value={marital_status}
                onChange={setMarital_status}/>
            </div> 
          </div>

          <div className="flex mb-1">
            <div className="flex flex-col mx-1 flex-1">
               <InputForm 
                label="CRM"
                value={crm}
                onChange={setCrm}
                required/>   
            </div> 
            <div className="flex flex-col mx-1 w-1/5">
              <SelectForm
                label="Documento Adicional"
                dataOptions={documentType}
                valueOption="doc"
                labelOption="doc"
                value={document_type}
                onChange={setDocument_type}/>
            </div> 
            <div className="flex flex-col mx-1 w-1/3">
              <InputForm 
                  label="N° Documento"
                  value={document}
                  onChange={setDocument}/>   
            </div> 
          </div>

          <div className="flex mb-1">
            <div className="flex flex-col mx-1 w-1/4">
               <InputForm 
                label="Nº Celular"
                value={number_cell}
                onChange={setNumber_cell}
                required/>   
            </div> 
            <div className="flex flex-col mx-1 w-1/4">
            <InputForm 
                label="Nº Adicional"
                value={number_additional}
                onChange={setNumber_additional}/>   
            </div> 
            <div className="flex flex-col mx-1 flex-1">
              <InputForm 
                  inputType="email"
                  label="E-mail"
                  value={email}
                  onChange={setEmail}
                  required/>     
            </div> 
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