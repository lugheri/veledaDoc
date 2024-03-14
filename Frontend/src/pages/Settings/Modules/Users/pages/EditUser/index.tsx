import {useState,useEffect,FormEvent} from 'react';
import { Button } from "../../../../../../components/Button"
import { InputForm, SelectForm } from "../../../../../../components/Inputs"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { CredentialDTO } from '../../../Credentials/Dto/credential.dto';
import { TeamDTO } from '../../../Teams/Dto/teams.dto';

type EditUserDTO = {
  account_id:number,
  editUser:number|null,
  resetPass:number|null,
  setResetPass:React.Dispatch<React.SetStateAction<number|null>>,
  setStatusRemoveUser:React.Dispatch<React.SetStateAction<number>>,
  setEditUser:React.Dispatch<React.SetStateAction<number|null>>,
  setNameRemoveUser:React.Dispatch<React.SetStateAction<string>>,  
  setNameResetUser:React.Dispatch<React.SetStateAction<string>>,
  setRemoveUser:React.Dispatch<React.SetStateAction<number|null>>
}

export const EditUser: React.FC<EditUserDTO> = (props) => {
  const [name,setName]=useState('')
  const [username,setUsername]=useState('')
  const [credential,setCredential]=useState('0')
  const [team_id,setTeamId]=useState('0')
  const [status,setStatus]=useState(0)

  //List Credentials
  const [ credentials, setCredentials] = useState<CredentialDTO[]|null>(null)
  const getCredentials = async () => {
    try{
      const c = await api.get(`listCredentials/${props.account_id}/1/1`)
      setCredentials(c.data.response)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{getCredentials()},[])



  const infoUser = async () => {
    try{     
      const userdata = await api.get(`getUser/${props.editUser}`)  
      setName(userdata.data.response.name)
      setUsername(userdata.data.response.username)
      setCredential(userdata.data.response.credential)
      setTeamId(userdata.data.response.team_id)
      setStatus(userdata.data.response.status)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{infoUser()},[])

  const inativarUsuario = () => {
    props.setRemoveUser(props.editUser)
    props.setStatusRemoveUser(status)
    props.setNameRemoveUser(name)
    props.setEditUser(null)    
  }  

  const resetPass = () => {
    props.setResetPass(props.editUser)
    props.setNameResetUser(name)
    props.setEditUser(null)    
  }  

  const createChangeUser = async (e:FormEvent) => {
    e.preventDefault()
    try{     
      const data = {"name":name,"username":username,"credential":parseInt(credential),"team_id":parseInt(team_id)}
      await api.patch(`updateUser/${props.editUser}`, data)        
    }catch(e){
      console.log(e)
    }
    props.setEditUser(null)   
  }
  return (
    <form className="flex flex-col" onSubmit={(e)=>createChangeUser(e)}>
      <TitleModal icon='faPlus' close={()=>props.setEditUser(null)} title='Informações do Usuário' subtitle='Visualize e altere todas as informações do Usuário.' />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col w-full ">
          <InputForm label="Nome" required placeholder='Nome do Nível' value={name} onChange={setName}/>
        </div>
        <div className="flex w-full ">
          <InputForm className="mr-1" label="Usuário" required placeholder='Usuário de Acesso' value={username} onChange={setUsername}/>
        </div>
        <div className="flex w-full ">
          {credentials === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando Cargos ...</p>
           : <SelectForm className="mr-1" dataOptions={credentials} labelOption='name' valueOption='id'
                label="Cargo" required empty='Selecione um Cargo' 
                value={credential} onChange={setCredential}/>}
          
        </div>        
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button 
          name="Cancelar" 
          btn="muted" 
          type='notline' 
          onClick={()=>props.setEditUser(null)} />
        <Button submit 
          name="Resetar Senha" 
          type="outline" 
          onClick={()=>resetPass()} 
          size="sm" icon="faKey" btn="warning" /> 
        { status == 0 ? 
          <Button submit name="Reativar Usuário" type="outline" icon="faUserCheck" size="sm" btn="success"
                  onClick={()=>inativarUsuario()} />    
          : <Button submit name="Inativar Usuário" type="outline" icon="faUserSlash" size="sm" btn="error"
          onClick={()=>inativarUsuario()} />  
          }    
        <Button submit name="Salvar Alterações" icon="faSave" size="sm"  btn="success" /> 
      </div> 
    </form>      
  )
}


