import { useEffect, useState } from "react"
import { IProfessional } from "../Dto/professional.dto"
import api from "../../../services/api"
import { Button } from "../../../components/Button"
import { TextError } from "../../../components/TextError"
import { Loading } from "../../../components/Loading"
import { AddProfessional } from "./AddProfessional"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons"
import { EditProfessional } from "./EditProfessional"
import { SubTitle } from "../../../components/Subtitle"

type ListProfessionalsProps = {
  clinicId:number,
  setAddProfessional:React.Dispatch<React.SetStateAction<boolean>>,
  addProfessional:boolean
}
export const ListProfessionals = (props:ListProfessionalsProps) => {
  const [ error, setError ] = useState<string|null>(null)
  const [ update, setUpdate] = useState(0)
  const [ professionals, setProfessionals ] = useState<IProfessional[]|null>(null)
  const getListProfessionals = async () => {
    try{
      const status=1
      const list = await api.get(`listProfessionals/${props.clinicId}/${status}`)
      if(list.data.error){
        setError(list.data.message)
        return
      }
      setProfessionals(list.data.response)
    }catch(err:any){ 
      console.log("erro",err)
      setError(`Ocorreu um erro na requisição dos dados! ${err.message}`)
    }
  }
  useEffect(()=>{getListProfessionals()},[update,props.addProfessional])

  return(
    <div className="flex flex-col  bg-white rounded-md shadow mx-2 mt-1 p-4">         
      { error !== null ? (
        <TextError icon="faExclamationTriangle" error={error}/>
      ) : professionals === null ? (
        <Loading/> 
      ) : professionals.length === 0 ? (
        <EmptyList addProfessional={props.setAddProfessional}/>
      ) : (
        <div className="flex flex-col">
          <SubTitle icon="faStethoscope" title={`${professionals.length} Profissionai(s) Cadastrado(s)`}/>
          <ListItems professionals={professionals} setUpdate={setUpdate}/>
        </div>        
      )}
      { props.addProfessional && ( <AddProfessional clinicId={props.clinicId} close={props.setAddProfessional}/> )}
    </div>
  )
}

const EmptyList = (props:{addProfessional:React.Dispatch<React.SetStateAction<boolean>>}) => { 
  return(
    <div className="flex flex-col flex-1 justify-center items-center px-4 py-8">
      <FontAwesomeIcon className="text-blue-500/50 text-4xl my-4" icon={faUserDoctor}/>
      <p className="text-gray-600 text-lg">Parece que você ainda não possui nenhum profissional cadastrado</p>
      <p className="text-gray-400 mb-4">Crie o primeiro clicando no botao abaixo!</p>
      <Button
        name="Cadastrar Primeiro Profissional"
        btn="info"
        icon="faPlus"
        onClick={()=>props.addProfessional(true)}
      />
    </div>
  )
}

type ListItemsProps = {
  professionals:IProfessional[]
  setUpdate:React.Dispatch<React.SetStateAction<number>>
}
const ListItems = (props:ListItemsProps) => {
  const [ editProfessional, setEditProfessional ] = useState<IProfessional|null>(null)
  useEffect(()=>{
    props.setUpdate((prevState) => prevState + 1)
  },[editProfessional])
  return(
    <div className="flex flex-wrap">
      { props.professionals.map((professional,key)=>(
        <ItemList 
          key={key} 
          professional={professional}
          editProfessional={setEditProfessional}/>
        ))}
      { editProfessional && (<EditProfessional professional={editProfessional} close={setEditProfessional}/>) }  
    </div>
  )
}

type IItemListProps = {
  professional:IProfessional
  editProfessional:React.Dispatch<React.SetStateAction<IProfessional|null>>
}
const ItemList = (props:IItemListProps) => {
  return(
    <div 
      className="flex flex-col justify-between items-center w-[15.5%] h-[200px] my-1 mx-[.5%] py-4 
                bg-blue-200/60 hover:bg-slate-300/70 border border-blue-400/50 rounded shadow-neutral-500/30 shadow-md">
      <FontAwesomeIcon 
        className="text-sky-600/50 mt-4 text-6xl" icon={faUserDoctor}/>
      <p className="text-slate-800 text-xs font-semibold text-center">{ props.professional.name}</p>
      <Button 
        btn="info" 
        name="Configurar" 
        icon="faCogs" 
        size="sm" 
        onClick={()=>props.editProfessional(props.professional)}/>
    </div>
  )
}