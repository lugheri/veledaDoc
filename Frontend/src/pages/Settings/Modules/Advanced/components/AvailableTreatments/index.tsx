import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Button } from "../../../../../../components/Button"
import { SubTitle } from "../../../../../../components/Subtitle"

import { ITreatment } from "../../Dto/treatments.dto"
import api from "../../../../../../services/api"
import { faFlaskVial, faVialCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Loading } from "../../../../../../components/Loading"
import { AddTreatment } from "./AddTreatment"
import { EditTreatment } from "./EditTreatment"
import { TextError } from "../../../../../../components/TextError"

export const AvailableTreatments = () => {
  const [update,setUpdate] = useState(0)
  const [ addTreatments, setAddTreatments ] = useState(false)
  const [ error, setError ] = useState<string|null>(null)
  const [ treatments, setTreatments ] = useState<ITreatment[]|null>(null)
  const getListTreatments = async () => {
    try{
      const status=1
      const list = await api.get(`listAvailableTreatments/${status}`)
      if(list.data.error){
        setError(list.data.message)
        return
      }
      setTreatments(list.data.response)
    }catch(err){ 
      console.log("erro",err)
      setError("Ocorreu um erro na requisição dos dados!")
    }
  }
  useEffect(()=>{getListTreatments()},[update,addTreatments])

  return(
    <div className="flex flex-col w-full bg-white rounded-md shadow mt-1 p-4">   
      <div className="flex justify-between items-center flex-1 border-b border-slate-100">
        <SubTitle 
          icon="faVialCircleCheck" 
          title="Configure os tratamentos disponiveis"/>
         
        <Button 
          btn="info" 
          icon="faPlus" 
          type="notline" 
          name="Adicionar Tratamento"
          onClick={()=>setAddTreatments(true)}/>
      </div>
      { error !== null ? (
        <TextError icon="faExclamationTriangle" error={error}/>
      ) : treatments === null ? (
        <Loading/> 
      ) : treatments.length === 0 ? (
        <EmptyList addTreatment={setAddTreatments}/>
      ) : (
        <ListItems treatments={treatments} setUpdate={setUpdate}/>
      )}
      { addTreatments && ( <AddTreatment close={setAddTreatments}/> )}
    </div>
  )
}

const EmptyList = (props:{addTreatment:React.Dispatch<React.SetStateAction<boolean>>}) => { 
  return(
    <div className="flex flex-col flex-1 justify-center items-center px-4 py-8">
      <FontAwesomeIcon className="text-blue-500/50 text-4xl my-4" icon={faFlaskVial}/>
      <p className="text-gray-600 text-lg">Parece que você ainda não possui nenhum tratamento disponível</p>
      <p className="text-gray-400 mb-4">Crie o primeiro clicando no botao abaixo!</p>
      <Button
        name="Criar Primeiro Tratamento"
        btn="info"
        icon="faPlus"
        onClick={()=>props.addTreatment(true)}
      />
    </div>
  )
}

type ListItemsProps = {
  treatments:ITreatment[]
  setUpdate:React.Dispatch<React.SetStateAction<number>>
}
const ListItems = (props:ListItemsProps) => {
  const [ editTreatment, setEditTreatment ] = useState<ITreatment|null>(null)
  useEffect(()=>{
    props.setUpdate((prevState) => prevState + 1)
  },[editTreatment])
  return(
    <div className="flex flex-wrap">
      { props.treatments.map((treatment,key)=>(
        <ItemList 
          key={key} 
          treatment={treatment}
          editTreatment={setEditTreatment}/>
        ))}
      { editTreatment && (<EditTreatment treatment={editTreatment} close={setEditTreatment}/>) }  
    </div>
  )
}

type IItemListProps = {
  treatment:ITreatment
  editTreatment:React.Dispatch<React.SetStateAction<ITreatment|null>>
}
const ItemList = (props:IItemListProps) => {
  return(
    <div 
      className="flex flex-col justify-between items-center w-[15.5%] h-[200px] my-1 mx-[.5%] py-4 
                bg-blue-200/60 hover:bg-slate-300/70 border border-blue-400/50 rounded shadow-neutral-500/30 shadow-md">
      <FontAwesomeIcon 
        className="text-sky-600/50 mt-4 text-6xl" icon={faVialCircleCheck}/>
      <p className="text-slate-800 text-xs font-semibold text-center">{ props.treatment.name}</p>
      <Button 
        btn="info" 
        name="Configurar" 
        icon="faCogs" 
        size="sm" 
        onClick={()=>props.editTreatment(props.treatment)}/>
    </div>
  )
}