import { useEffect, useState } from "react"
import { IPatient } from "./Dto/patient.dto"
import api from "../../services/api"
import { TextError } from "../../components/TextError"
import { Loading } from "../../components/Loading"
import { SubTitle } from "../../components/Subtitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHospitalUser, faSearch } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../components/Button"
//import { EditPatient } from "./EditPatient"
import { AddPatient } from "./AddPatient"
import { InputForm } from "../../components/Inputs"

type ListPatientProps = {
  clientId:number,
  setAddPatient:React.Dispatch<React.SetStateAction<boolean>>,
  addPatient:boolean
  editPatient:IPatient|null,
  setEditPatient:React.Dispatch<React.SetStateAction<IPatient|null>>
}
export const ListPatient = (props:ListPatientProps) => {
  const [ update, setUpdate] = useState(0)
  const [ error, setError ] = useState<string|null>(null)
  const [ patients, setPatients ] = useState<IPatient[]|null>(null)
  const [ searchParams, setSearchParams ] = useState<string>('')
  const getListPatients = async () => {
    try{
      const status=1
      const list = searchParams === '' ? await api.get(`listPatients/${status}`) 
                                      : await api.get(`searchPatients/${searchParams}`)
      if(list.data.error){
        setError(list.data.message)
        return
      }
      setPatients(list.data.response)
    }catch(err){ 
      console.log("erro",err)
      setError("Ocorreu um erro na requisição dos dados!")
    }
  }
  useEffect(()=>{getListPatients()},[update,props.addPatient,searchParams])

  return(
    <div className="flex flex-col w-full bg-white rounded-md shadow mt-1 p-4">   
      
      { error !== null ? (
        <TextError icon="faExclamationTriangle" error={error}/>
      ) : patients === null ? (
        <Loading/> 
      ) : patients.length === 0 && searchParams === ''  ? (
        <EmptyList addPatient={props.setAddPatient}/>
      ) : (
        <div className="flex flex-col">
          <div className="flex w-full justify-between items-center">
            <SubTitle 
              icon="faUsers" 
              title={`${patients.length} Paciente(s) ${searchParams === '' ? 'Cadastrado(s)' : 'Localizado(s)'}`}/>
            <div className="w-1/2">
              <InputForm 
                label="Buscar Pacientes"
                value={searchParams}
                onChange={setSearchParams}
                placeholder="Busque os pacientes pelo nome ou prontuário"/>
            </div>
          </div>
          { patients.length === 0 && searchParams != '' && (
            <div className="flex flex-col justify-center items-center p-4 border-b-2 border-slate-200 mb-1">
              <FontAwesomeIcon className="text-4xl text-sky-400/50 my-4 " icon={faSearch}/>
              <p className="text-slate-500">Nenhum paciente localizado pelo parâmetro: <strong>{searchParams}</strong></p>
            </div>
            
          )} 
          <ListItems setEditPatient={props.setEditPatient} patients={patients} setUpdate={setUpdate}/>
        </div>        
      )}
      { props.addPatient && ( <AddPatient clientId={props.clientId} close={props.setAddPatient}/> )}
    </div>
  )
}

const EmptyList = (props:{addPatient:React.Dispatch<React.SetStateAction<boolean>>}) => { 
  return(
    <div className="flex flex-col flex-1 justify-center items-center px-4 py-8">
      <FontAwesomeIcon className="text-blue-500/50 text-4xl my-4" icon={faHospitalUser}/>
      <p className="text-gray-600 text-lg">Parece que você ainda não possui nenhum paciente cadastrado</p>
      <p className="text-gray-400 mb-4">Crie o primeiro clicando no botao abaixo!</p>
      <Button
        name="Cadastrar Primeiro Paciente"
        btn="info"
        icon="faPlus"
        onClick={()=>props.addPatient(true)}
      />
    </div>
  )
}

type ListItemsProps = {
  patients:IPatient[]
  setUpdate:React.Dispatch<React.SetStateAction<number>>
  setEditPatient:React.Dispatch<React.SetStateAction<IPatient|null>>
}
const ListItems = (props:ListItemsProps) => {
 
  return(
    <div className="flex flex-wrap bg-slate-200 max-h-[65vh] overflow-auto p-2 rounded">
      { props.patients.map((patient,key)=>(
        <ItemList 
          key={key} 
          patient={patient}
          editPatient={props.setEditPatient}/>
        ))}
       
    </div>
  )
}

type IItemListProps = {
  patient:IPatient
  editPatient:React.Dispatch<React.SetStateAction<IPatient|null>>
}
const ItemList = (props:IItemListProps) => {
  return(
    <div 
      className="flex justify-between items-center w-full mb-1 p-3 
                bg-white hover:bg-sky-100 rounded shadow">
      <FontAwesomeIcon 
        className="text-sky-600/50 text-xl" icon={faHospitalUser}/>
      <p className="text-slate-800 text-xs font-semibold text-center">{ props.patient.name}</p>
      <Button 
        btn="info" 
        icon="faFolderOpen"
        type="notline" 
        size="sm" 
        onClick={()=>props.editPatient(props.patient)}/>
    </div>
  )
}