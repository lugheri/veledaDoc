import {useState, useEffect} from 'react';
import { Button } from "../../../../components/Button"
import { TitlePage } from "../../../../components/TitlePage"
import { CredentialDTO } from './Dto/credential.dto';
import api from '../../../../services/api';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { SelectForm } from '../../../../components/Inputs';
import { Card } from '../../../../components/Cards';
import { Modal } from '../../../../components/Modal';
import { NewCredential } from './pages/NewCredential';
import { EditCredential } from './pages/EditCredential';
import { RemoveCredential } from './pages/RemoveCredential';
import { User } from '../../../../contexts/Dtos/auth.dto';
import useAuth from '../../../../hooks/useAuth';
import { Loading } from '../../../../components/Loading';


export const Credentials = () => {
  const authenticate = useAuth();  
  const userData:User|null = authenticate ? authenticate.userData : null 
  const [ status, setStatus ] = useState(1)
  const [ totalCredentials, setTotalCredentials] = useState<number | null>(null)  
  //Actions
  const [newCredential,setNewCredential] = useState<boolean>(false)//NewCredential
  const [editCredential,setEditCredential] = useState<number|null>(null)//EditCredential
  const [removeCredential,setRemoveCredential] = useState<number|null>(null)//RemoveCredential
  //SubPropsRemoveCredential
  const [nameRemoveCredential,setNameRemoveCredential] = useState<string>('')//RemoveCredential
  const [statusRemoveCredential,setStatusRemoveCredential] = useState<number>(0)//RemoveCredential  

  const countCredential = async () => {
    try{
      const tl = await api.get(`totalCredentials/${userData?.account_id}/${status}`)
      setTotalCredentials(tl.data.response)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{ countCredential() },[status,newCredential,editCredential,removeCredential])

  const changeStatus = [{'status':0,'name':'Cargos Inativos'},{'status':1,'name':'Cargos Ativos'}]

  
  return(
    userData === null ? <Loading/> : (
      <div className="flex flex-col">
        <TitlePage 
          icon="faIdCardClip" 
          title="Configurações | Cargos" 
          rightComponent={<Button btn="success" icon="faPlus" name="Adicionar Novo Cargo" onClick={()=>setNewCredential(true)}/>}/>

        <div className="bg-white p-2 rounded shadow flex justify-between items-center">
          <p className="text-slate-400 flex-1 font-medium">
            { totalCredentials === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando ...</p> 
            : `${totalCredentials} - Cargo(s)`} 
          </p> 
          <div className="w-1/5">
            <SelectForm dataOptions={changeStatus} labelOption='name' valueOption='status' value={status} onChange={setStatus} />
          </div>
        </div>

        <Card className="mt-4" component={
          <table className="table-auto w-full">
            <thead className="text-slate-400 text-sm font-extralight">
              <tr>
                <th className="font-medium">Cód</th>
                <th className="font-medium">Cargo</th>
                <th className="font-medium">Descrição</th>
                <th className="font-medium">Nível de Acesso</th>
                <th className="font-medium">Status</th>
                <th className="font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <PageCredentials 
                account_id={userData?.account_id}
                page={1} 
                status={status}
                newCredential={newCredential}
                editCredential={editCredential} setEditCredential={setEditCredential}
                removeCredential={removeCredential} setRemoveCredential={setRemoveCredential}
                setNameRemoveCredential={setNameRemoveCredential} setStatusRemoveCredential={setStatusRemoveCredential}/>  
            </tbody>
          </table>
        }/>
        {newCredential && <Modal component={<NewCredential account_id={userData.account_id} setNewCredential={setNewCredential}/>} />}
        {editCredential && <Modal component={<EditCredential account_id={userData.account_id} editCredential={editCredential} setEditCredential={setEditCredential}/>}/>}
        {removeCredential && <Modal component={<RemoveCredential name={nameRemoveCredential} status={statusRemoveCredential} removeCredential={removeCredential} setRemoveCredential={setRemoveCredential}/>}/>}
      </div>
    )
  )
}

type PageCredentialsDTO = {
  account_id:number;
  status: number;
  page: number;
  newCredential: boolean;
  editCredential: number | null;
  removeCredential: number | null;
  setEditCredential: React.Dispatch<React.SetStateAction<number|null>>;
  setRemoveCredential: React.Dispatch<React.SetStateAction<number|null>>;
  setNameRemoveCredential: React.Dispatch<React.SetStateAction<string>>;
  setStatusRemoveCredential: React.Dispatch<React.SetStateAction<number>>;
}

const PageCredentials: React.FC<PageCredentialsDTO> = (props) => {
  const [ credentials, setCredentials ] = useState<CredentialDTO[] | null>(null)
  const listCredentials = async () => {
    try{
      const tl = await api.get(`listCredentials/${props.account_id}/${props.status}/${props.page}`)
      setCredentials(tl.data.response)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{ listCredentials() },[props.status,props.newCredential,props.editCredential,props.removeCredential])
  
  return(
    credentials === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando ...</p>
    : credentials ? 
      credentials.map((credential,key)=>
        <tr key={key} className="odd:bg-white odd:hover:bg-slate-100 even:bg-slate-200 even:hover:bg-slate-300 text-center text-slate-600">
          <td>{credential.id}</td>
          <td>{credential.name}</td>
          <td>{credential.description}</td>
          <td>{credential.SysLevel.name}</td>
          <td>{credential.status == 1 ? 'Ativo' : 'Inativo'}</td>
          <td className="flex justify-end">
            <Button icon="faEdit" btn='info' size='sm' onClick={()=>props.setEditCredential(credential.id)}/>
            <Button icon={`${credential.status == 1 ? "faTrash" : "faCheck"}`}
                    btn={`${credential.status == 1 ? "error" : "success"}`} size='sm' onClick={()=>{props.setRemoveCredential(credential.id),props.setNameRemoveCredential(credential.name),props.setStatusRemoveCredential(credential.status == 1 ? 0 : 1)}}/>
          </td>
        </tr>
      ) 
    : <tr className="bg-slate-50 text-center"><td colSpan={5}>Nenhum cargo localizado</td></tr>
  )
}