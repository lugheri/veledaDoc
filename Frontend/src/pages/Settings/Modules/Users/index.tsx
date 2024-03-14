import {useState, useEffect} from 'react';
import { Button } from "../../../../components/Button"
import { TitlePage } from "../../../../components/TitlePage"
import { UserDTO } from './Dto/users.dto';
import api from '../../../../services/api';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { SelectForm } from '../../../../components/Inputs';
import { Card } from '../../../../components/Cards';
import { Modal } from '../../../../components/Modal';
import { NewUser } from './pages/NewUser';
import { EditUser } from './pages/EditUser';
import { RemoveUser } from './pages/RemoveUser';
import { ResetPass } from './pages/ResetPass';
import useAuth from '../../../../hooks/useAuth';
import { User } from '../../../../contexts/Dtos/auth.dto';
import { Loading } from '../../../../components/Loading';


export const Users = () => {
  const authenticate = useAuth();  
  const userData:User|null = authenticate ? authenticate.userData : null

  const [ status, setStatus ] = useState(1)
  const [ totalUsers, setTotalUsers] = useState<number | null>(null)  
  //Actions
  const [newUser,setNewUser] = useState<boolean>(false)//NewUser
  const [editUser,setEditUser] = useState<number|null>(null)//EditUser
  const [removeUser,setRemoveUser] = useState<number|null>(null)//RemoveUser
  //SubPropsRemoveUser
  const [nameRemoveUser,setNameRemoveUser] = useState<string>('')//RemoveUser
  const [statusRemoveUser,setStatusRemoveUser] = useState<number>(0)//RemoveUser  
  //ResetPass  
  const [nameResetUser,setNameResetUser] = useState<string>('')//RemoveUse
  const [resetPass,setResetPass] = useState<number|null>(null)

  const countUsers = async () => {
    try{
      const tl = await api.get(`totalUsers/${userData?.account_id}/${status}`)
      setTotalUsers(tl.data.response)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{ countUsers() },[status,newUser,editUser,removeUser,resetPass])

  const changeStatus = [{'status':0,'name':'Usuários Inativos'},{'status':1,'name':'Usuários Ativos'}]

  
  return(
    userData === null ? <Loading/> : (
      <div className="flex flex-col">
        <TitlePage 
          icon="faUserGroup" 
          title="Configurações | Usuários" 
          rightComponent={<Button btn="success" icon="faPlus" name="Adicionar Nova Equipe" onClick={()=>setNewUser(true)}/>}/>

        <div className="bg-white p-2 rounded shadow flex justify-between items-center">
          <p className="text-slate-400 flex-1 font-medium">
            { totalUsers === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando ...</p> 
            : `${totalUsers} - Usuário(s)`} 
          </p> 
          <div className="w-1/5">
            <SelectForm dataOptions={changeStatus} labelOption='name' valueOption='status' value={status} onChange={setStatus} />
          </div>
        </div>
        <div className="flex flex-wrap">
          <PageUsers 
            account_id={userData.account_id}
            page={1} 
            status={status}
            newUser={newUser}
            editUser={editUser} setEditUser={setEditUser}          
            removeUser={removeUser} setRemoveUser={setRemoveUser}
            setNameRemoveUser={setNameRemoveUser} setStatusRemoveUser={setStatusRemoveUser}/>  
        </div>
        {newUser && <Modal component={<NewUser 
                                        account_id={userData.account_id} setNewUser={setNewUser}/>} />}
        {editUser && <Modal component={<EditUser 
                                            account_id={userData.account_id}
                                            editUser={editUser} 
                                            setEditUser={setEditUser} 
                                            resetPass={resetPass} setResetPass={setResetPass}
                                            setStatusRemoveUser={setStatusRemoveUser}
                                            setNameResetUser={setNameResetUser}
                                            setNameRemoveUser={setNameRemoveUser} 
                                            setRemoveUser={setRemoveUser}/>}/>}
        {resetPass && <Modal component={<ResetPass 
                                          name={nameResetUser}  
                                          setEditUser={setEditUser} 
                                          resetPass={resetPass} 
                                          setResetPass={setResetPass} />}/>}
        {removeUser && <Modal component={<RemoveUser 
                                            setEditUser={setEditUser} 
                                            name={nameRemoveUser} 
                                            status={statusRemoveUser} 
                                            removeUser={removeUser} 
                                            setRemoveUser={setRemoveUser}/>}/>}
      </div>
    )
  )
}

type PropsPageUser = {
  account_id:number;
  status: number;
  page: number;
  newUser: boolean;
  editUser: number | null;
  removeUser: number | null;
  setEditUser: React.Dispatch<React.SetStateAction<number|null>>;
  setRemoveUser: React.Dispatch<React.SetStateAction<number|null>>;
  setNameRemoveUser: React.Dispatch<React.SetStateAction<string>>;
  setStatusRemoveUser: React.Dispatch<React.SetStateAction<number>>;
}

const PageUsers = (props:PropsPageUser) => {
  const [ users, setUsers ] = useState<UserDTO[] | null>(null)
  const listUsers = async () => {
    try{
      const tl = await api.get(`listUsers/${props.account_id}/${props.status}/${props.page}`)
      console.log('LIST USERS',tl.data.response)
      setUsers(tl.data.response)
    }catch(err){
      console.log(err)
    }
  }

  const formatDate = (date:string) => {
    const data = new Date(date);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Adicionamos 1 porque os meses são indexados de 0 a 11
    const ano = data.getFullYear();
    
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada
  }

  useEffect(()=>{ listUsers() },[props.status,props.newUser,props.editUser,props.removeUser])
  
  return(
    users === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando ...</p>
    : users ? 
    users.map((user,key)=>
      <Card key={key} className="mt-2 mx-[.375%] w-[200px]" component={
        <div className="flex flex-col  w-full items-center">
          <div className="flex justify-between w-full">
            { user.logged == 1 ? 
              <div className="bg-teal-100 flex text-teal-600 font-semibold px-2 py-1 rounded shadow text-xs">Logado</div> 
            : <div className="bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded shadow text-xs">Deslogado</div>}
            <button className="text-gray-400" onClick={()=>props.setEditUser(user.id)}>
              <FontAwesomeIcon icon={Fas.faEllipsis}/>
            </button>
          </div>
          <FontAwesomeIcon className="text-6xl pt-4 text-sky-300 opacity-60" icon={Fas.faUserCircle}/>
          <p className="text-blue-500 mb-2 text-center">{user.name}</p>
          <div className="flex items-center w-full justify-between py-1 border-b border-b-slate-200">
            <p className="text-slate-400 font-semibold text-xs">Cod.:</p>
            <p className="text-slate-400  text-xs">{user.id}</p>
          </div>
          <div className="flex  items-center w-full justify-between py-1 border-b border-b-slate-200">
            <p className="text-slate-400 font-semibold text-xs">Desde</p>
            <p className="text-slate-400  text-xs">{formatDate(user.createdAt)}</p>
          </div>
          <div className="flex items-center w-full justify-between py-1 ">
            <p className="text-slate-400 font-semibold text-xs">Cargo</p>
            <p className="text-slate-400 text-xs text-right">{user.SysCredential.name}</p>
          </div>
        </div>
      }/>) 
    : <tr className="bg-slate-50 text-center"><td colSpan={5}>Nenhum usuário encontrado</td></tr>
  )
}