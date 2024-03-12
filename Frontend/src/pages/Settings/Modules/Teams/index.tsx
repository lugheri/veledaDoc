import {useState, useEffect} from 'react';
import { Button } from "../../../../components/Button"
import { TitlePage } from "../../../../components/TitlePage"
import { TeamDTO } from './Dto/teams.dto';
import api from '../../../../services/api';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { SelectForm } from '../../../../components/Inputs';
import { Card } from '../../../../components/Cards';
import { Modal } from '../../../../components/Modal';
import { NewTeam } from './pages/NewTeam';
import { EditTeam } from './pages/EditTeam';
import { RemoveTeam } from './pages/RemoveTeam';
import useAuth from '../../../../hooks/useAuth';
import { User } from '../../../../contexts/Dtos/auth.dto';
import { Loading } from '../../../../components/Loading';


export const Teams = () => {
  const authenticate = useAuth();  
  const userData:User|null = authenticate ? authenticate.userData : null

  const [ status, setStatus ] = useState(1)
  const [ totalTeams, setTotalTeams] = useState<number | null>(null)
  
  //Actions
  const [newTeam,setNewTeam] = useState<boolean>(false)//NewTeam
  const [editTeam,setEditTeam] = useState<number|null>(null)//EditTeam
  const [removeTeam,setRemoveTeam] = useState<number|null>(null)//RemoveTeam
  //SubPropsRemoveTeam
  const [nameRemoveTeam,setNameRemoveTeam] = useState<string>('')//RemoveTeam
  const [statusRemoveTeam,setStatusRemoveTeam] = useState<number>(0)//RemoveTeam

  

  const countTeams = async () => {
    try{
      const tl = await api.get(`totalTeams/${userData?.account_id}/${status}`)
      setTotalTeams(tl.data.response)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{ countTeams() },[status,newTeam,editTeam,removeTeam])

  const changeStatus = [{'status':0,'name':'Equipes Inativas'},{'status':1,'name':'Equipes Ativas'}]

  
  return(
    userData === null ? <Loading/> : (
      <div className="flex flex-col">
        <TitlePage 
          icon="faUsersLine" 
          title="Configurações | Equipes" 
          rightComponent={<Button btn="success" icon="faPlus" name="Adicionar Nova Equipe" onClick={()=>setNewTeam(true)}/>}/>

        <div className="bg-white p-2 rounded shadow flex justify-between items-center">
          <p className="text-slate-400 flex-1 font-medium">
            { totalTeams === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando ...</p> 
            : `${totalTeams} - Equipe(s)`} 
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
                <th className="font-medium">Nível</th>
                <th className="font-medium">Descrição</th>
                <th className="font-medium">Status</th>
                <th className="font-medium"></th>
              </tr>
            </thead>
            <tbody>
              <PageTeams 
                account_id={userData.account_id}
                page={1} 
                status={status}
                newTeam={newTeam}
                editTeam={editTeam} setEditTeam={setEditTeam}
                removeTeam={removeTeam} setRemoveTeam={setRemoveTeam}
                setNameRemoveTeam={setNameRemoveTeam} setStatusRemoveTeam={setStatusRemoveTeam}/>  
            </tbody>
          </table>
        }/>
        {newTeam && <Modal component={<NewTeam setNewTeam={setNewTeam}/>} />}
        {editTeam && <Modal component={<EditTeam editTeam={editTeam} setEditTeam={setEditTeam}/>}/>}
        {removeTeam && <Modal component={<RemoveTeam name={nameRemoveTeam} status={statusRemoveTeam} removeTeam={removeTeam} setRemoveTeam={setRemoveTeam}/>}/>}
      </div>
    )
  )
}

type PageTeamsDTO = {
  account_id:number;
  status: number;
  page: number;
  newTeam: boolean;
  editTeam: number | null;
  removeTeam: number | null;
  setEditTeam: React.Dispatch<React.SetStateAction<number|null>>;
  setRemoveTeam: React.Dispatch<React.SetStateAction<number|null>>;
  setNameRemoveTeam: React.Dispatch<React.SetStateAction<string>>;
  setStatusRemoveTeam: React.Dispatch<React.SetStateAction<number>>;
}

const PageTeams: React.FC<PageTeamsDTO> = (props) => {
  const [ teams, setTeams ] = useState<TeamDTO[] | null>(null)
  const listTeams = async () => {
    try{
      const tl = await api.get(`listTeams/${props.account_id}/${props.status}/${props.page}`)
      setTeams(tl.data.response)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{ listTeams() },[props.status,props.newTeam,props.editTeam,props.removeTeam])
  
  return(
    teams === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando ...</p>
    : teams ? 
    teams.map((team,key)=>
      <tr key={key} className="odd:bg-white odd:hover:bg-slate-100 even:bg-slate-200 even:hover:bg-slate-300 text-center text-slate-600">
        <td>{team.id}</td>
        <td>{team.name}</td>
        <td>{team.description}</td>
        <td>{team.status == 1 ? 'Ativo' : 'Inativo'}</td>
        <td className="flex justify-end">
          <Button icon="faEdit" btn='info' size='sm' onClick={()=>props.setEditTeam(team.id)}/>
          <Button icon={`${team.status == 1 ? "faTrash" : "faCheck"}`}
                  btn={`${team.status == 1 ? "error" : "success"}`} size='sm' onClick={()=>{props.setRemoveTeam(team.id),props.setNameRemoveTeam(team.name),props.setStatusRemoveTeam(team.status == 1 ? 0 : 1)}}/>
        </td>
      </tr>
    ) 
    : <tr className="bg-slate-50 text-center"><td colSpan={5}>Nenhuma equipe encontrada</td></tr>
  )
}