import {useState,useEffect,FormEvent} from 'react';
import { Button } from "../../../../../../components/Button"
import { InputForm, SelectForm, TextAreaForm } from "../../../../../../components/Inputs"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';
import { LevelDTO } from '../../../Levels/Dto/levels.dto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Fas from "@fortawesome/free-solid-svg-icons";

export const EditCredential: React.FC<{editCredential:number|null,setEditCredential:React.Dispatch<React.SetStateAction<number|null>>}> = (props) => {
  const [name,setName]=useState('')  
  const [levelId, setLevelId] = useState<string>('');
  const [description,setDescription]=useState('')

  const getInfoCredential = async () => {
    try{
      const info = await api.get(`getCredential/${props.editCredential}`)
      setName(info.data.response.name)
      setLevelId(info.data.response.level_id)
      setDescription(info.data.response.description)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{getInfoCredential()},[])
  
  const [ levels, setLevels] = useState<LevelDTO[]|null>(null)
  const getLevels = async () => {
    try{
      const l = await api.get(`listLevels/1/1`)
      console.log('l',l)
      setLevels(l.data.response)
    }catch(e){
      console.log(e)
    }
  }  
  useEffect(()=>{getLevels()},[])

  const saveChangesCredential = async (e:FormEvent) => {
    e.preventDefault()
    const data = {"name":name,"description":description,"level_id":parseInt(levelId)}
    try{     
      await api.patch(`updateCredential/${props.editCredential}`, data) 
    }catch(e){
      console.log(e)   
    }
    props.setEditCredential(null)   
  }
  return (
    <form className="flex flex-col" onSubmit={(e)=>saveChangesCredential(e)}>
      <TitleModal icon='faEdit' close={()=>props.setEditCredential(null)} title='Editar Cargo' subtitle='Editar informações do Cargo' />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col w-full ">
          <InputForm label="Nome" required placeholder='Nome do Cargo' value={name} onChange={setName}/>
        </div>
        <div className="flex flex-col w-full ">
          {levels === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando Níveis ...</p>
           : <SelectForm dataOptions={levels} labelOption='name' valueOption='id'
                label="Nível de Acesso" required 
                 empty='Selecione um Nível de Acesso' 
                value={levelId} onChange={setLevelId}/>}
        </div>
        <div className="flex flex-col w-full ">
          <TextAreaForm label="Descrição" placeholder='Breve Descrição' value={description} onChange={setDescription}/>
        </div>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setEditCredential(null)} />
        <Button submit name="Salvar Alterações" icon="faSave" btn="info" /> 
      </div> 
    </form>    
  )
}


