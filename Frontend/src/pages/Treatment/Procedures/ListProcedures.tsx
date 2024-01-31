import { useEffect, useState } from "react"
import api from "../../../services/api"
import { Button } from "../../../components/Button"
import { TextError } from "../../../components/TextError"
import { Loading } from "../../../components/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSyringe, faUserDoctor } from "@fortawesome/free-solid-svg-icons"
import { SubTitle } from "../../../components/Subtitle"
import { IProcedure } from "../Dto/procedure.dto"
import { AddProcedure } from "./AddProcedures"
import { EditProcedure } from "./EditProcedures"

type ListProceduresProps = {
  clientId:number,
  setAddProcedure:React.Dispatch<React.SetStateAction<boolean>>,
  addProcedure:boolean
}
export const ListProcedures = (props:ListProceduresProps) => {
  const [ update, setUpdate] = useState(0)
  const [ error, setError ] = useState<string|null>(null)
  const [ procedures, setProcedures ] = useState<IProcedure[]|null>(null)
  const getListProfessionals = async () => {
    try{
      const status=1
      const list = await api.get(`listProcedures/${status}`)
      if(list.data.error){
        setError(list.data.message)
        return
      }
      setProcedures(list.data.response)
    }catch(err){ 
      console.log("erro",err)
      setError("Ocorreu um erro na requisição dos dados!")
    }
  }
  useEffect(()=>{getListProfessionals()},[update,props.addProcedure])

  return(
    <div className="flex flex-col w-full bg-white rounded-md shadow mt-1 p-4">   
      
      { error !== null ? (
        <TextError icon="faExclamationTriangle" error={error}/>
      ) : procedures === null ? (
        <Loading/> 
      ) : procedures.length === 0 ? (
        <EmptyList addProcedure={props.setAddProcedure}/>
      ) : (
        <div className="flex flex-col">
          <SubTitle icon="faSyringe" title={`${procedures.length} Procedimento(s) Cadastrado(s)`}/>
          <ListItems procedures={procedures} setUpdate={setUpdate}/>
        </div>        
      )}
      { props.addProcedure && ( <AddProcedure clientId={props.clientId} close={props.setAddProcedure}/> )}
    </div>
  )
}

const EmptyList = (props:{addProcedure:React.Dispatch<React.SetStateAction<boolean>>}) => { 
  return(
    <div className="flex flex-col flex-1 justify-center items-center px-4 py-8">
      <FontAwesomeIcon className="text-blue-500/50 text-4xl my-4" icon={faSyringe}/>
      <p className="text-gray-600 text-lg">Parece que você ainda não possui nenhum procedimento cadastrado</p>
      <p className="text-gray-400 mb-4">Crie o primeiro clicando no botao abaixo!</p>
      <Button
        name="Cadastrar Primeiro Procedimento"
        btn="info"
        icon="faPlus"
        onClick={()=>props.addProcedure(true)}
      />
    </div>
  )
}

type ListItemsProps = {
  procedures:IProcedure[]
  setUpdate:React.Dispatch<React.SetStateAction<number>>
}
const ListItems = (props:ListItemsProps) => {
  const [ editProcedure, setEditProcedure ] = useState<IProcedure|null>(null)
  useEffect(()=>{
    props.setUpdate((prevState) => prevState + 1)
  },[editProcedure])
  return(
    <div className="flex flex-wrap">
      { props.procedures.map((procedure,key)=>(
        <ItemList 
          key={key} 
          procedure={procedure}
          editProcedure={setEditProcedure}/>
        ))}
      { editProcedure && (<EditProcedure procedure={editProcedure} close={setEditProcedure}/>) }  
    </div>
  )
}

type IItemListProps = {
  procedure:IProcedure
  editProcedure:React.Dispatch<React.SetStateAction<IProcedure|null>>
}
const ItemList = (props:IItemListProps) => {
  return(
    <div 
      className="flex flex-col justify-between items-center w-[15.5%] h-[200px] my-1 mx-[.5%] py-4 
                bg-blue-200/60 hover:bg-slate-300/70 border border-blue-400/50 rounded shadow-neutral-500/30 shadow-md">
      <FontAwesomeIcon 
        className="text-sky-600/50 mt-4 text-6xl" icon={faUserDoctor}/>
      <p className="text-slate-800 text-xs font-semibold text-center">{ props.procedure.name}</p>
      <Button 
        btn="info" 
        name="Configurar" 
        icon="faCogs" 
        size="sm" 
        onClick={()=>props.editProcedure(props.procedure)}/>
    </div>
  )
}