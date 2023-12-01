import {useState,useEffect,FormEvent} from 'react';
import { Button } from "../../../../../../components/Button"
import { InputForm, SelectForm, TextAreaForm } from "../../../../../../components/Inputs"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';
import { LevelDTO } from '../../../Levels/Dto/levels.dto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Fas from "@fortawesome/free-solid-svg-icons";

export const NewCredential: React.FC<{setNewCredential:React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
  const [name,setName]=useState('')
  const [levelId, setLevelId] = useState<string>('');
  const [description,setDescription]=useState('')
  
  const createNewCredential = async (e:FormEvent) => {
    e.preventDefault()
    props.setNewCredential(false)  
    const data = {"name":name,"description":description,"level_id":parseInt(levelId),"status":1}
    try{
      await api.post(`newCredential`, data)        
    }catch(e){
      console.log(e)
    }
  }

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
  return (
    <form className="flex flex-col" onSubmit={(e)=>createNewCredential(e)}>
      <TitleModal icon='faPlus' close={()=>props.setNewCredential(false)} title='Adicionar Novo Cargo' subtitle='Crie um novo cargo' />
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
        <div className="flex flex-col w-full mt-2">
          <TextAreaForm label="Descrição" placeholder='Breve Descrição' value={description} onChange={setDescription}/>
        </div>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setNewCredential(false)} />
        <Button submit name="Criar Cargo" icon="faSave" btn="success" /> 
      </div> 
    </form>   
  )
}