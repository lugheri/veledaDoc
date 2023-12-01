import {useState,useEffect,FormEvent} from 'react';
import { Button } from "../../../../../../components/Button"
import { InputForm, SelectForm } from "../../../../../../components/Inputs"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { CredentialDTO } from '../../../Credentials/Dto/credential.dto';
import { TeamDTO } from '../../../Teams/Dto/teams.dto';

export const NewUser: React.FC<{setNewUser:React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
  const [name,setName]=useState('')
  const [username,setUsername]=useState('')
  const [credential,setCredential]=useState('0')
  const [team_id,setTeamId]=useState('0')
  const [password,setPassword]=useState('') 

  //List Credentials
  const [ credentials, setCredentials] = useState<CredentialDTO[]|null>(null)
  const getCredentials = async () => {
    try{
      const c = await api.get(`listCredentials/1/1`)
      setCredentials(c.data.response)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{getCredentials()},[])

  //List Teams
  const [ teams, setTeams] = useState<TeamDTO[]|null>(null)
  const getTeams = async () => {
    try{
      const t = await api.get(`listTeams/1/1`)
      setTeams(t.data.response)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{getTeams()},[])
  
  
  const createNewUser = async (e:FormEvent) => {
    e.preventDefault()
    try{     
      const data = {"name":name,"username":username,"credential":parseInt(credential),"team_id":parseInt(team_id),"password":password,"status":1}
      await api.post(`newUser`, data)        
    }catch(e){
      console.log(e)
    }
    props.setNewUser(false)   
  }
  return (
    <form className="flex flex-col" onSubmit={(e)=>createNewUser(e)}>
      <TitleModal icon='faPlus' close={()=>props.setNewUser(false)} title='Adicionar Novo Usuário' subtitle='Cadastre um novo usuário' />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col w-full ">
          <InputForm label="Nome" required placeholder='Nome do Usuário' value={name} onChange={setName}/>
        </div>
        <div className="flex w-full ">
          <InputForm className="mr-1" label="Usuário" required placeholder='Usuário de Acesso' value={username} onChange={setUsername}/>
          <InputForm label="Senha" required placeholder='Senha de Acesso' value={password} onChange={setPassword}/>
          
        </div>
        <div className="flex w-full ">
          {credentials === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando Cargos ...</p>
           : <SelectForm className="mr-1" dataOptions={credentials} labelOption='name' valueOption='id'
                label="Cargo" required empty='Selecione um Cargo' 
                value={credential} onChange={setCredential}/>}
          {teams === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando Cargos ...</p>
           : <SelectForm dataOptions={teams} labelOption='name' valueOption='id'
                label="Equipes" empty='Selecione uma Equipe' 
                value={team_id} onChange={setTeamId}/>}
        </div>        
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setNewUser(false)} />
        <Button submit name="Criar Usuário" icon="faSave" btn="success" /> 
      </div> 
    </form>   
  )
}