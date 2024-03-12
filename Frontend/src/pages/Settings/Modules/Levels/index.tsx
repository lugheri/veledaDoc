import {useState, useEffect} from 'react';
import { Button } from "../../../../components/Button"
import { TitlePage } from "../../../../components/TitlePage"
import { LevelDTO } from './Dto/levels.dto';
import api from '../../../../services/api';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { SelectForm } from '../../../../components/Inputs';
import { Card } from '../../../../components/Cards';
import { Modal } from '../../../../components/Modal';
import { NewLevel } from './pages/NewLevel';
import { EditLevel } from './pages/EditLevel';
import { RemoveLevel } from './pages/RemoveLevel';
import { User } from '../../../../contexts/Dtos/auth.dto';
import useAuth from '../../../../hooks/useAuth';
import { Loading } from '../../../../components/Loading';


export const Levels = () => {
  const authenticate = useAuth();  
  const userData:User|null = authenticate ? authenticate.userData : null
  
  const [ status, setStatus ] = useState(1)
  const [ totalLevels, setTotalLevels] = useState<number | null>(null)
  
  //Actions
  const [newLevel,setNewLevel] = useState<boolean>(false)//NewLevel
  const [editLevel,setEditLevel] = useState<number|null>(null)//EditLevel
  const [removeLevel,setRemoveLevel] = useState<number|null>(null)//RemoveLevel
  //SubPropsRemoveLevel
  const [nameRemoveLevel,setNameRemoveLevel] = useState<string>('')//RemoveLevel
  const [statusRemoveLevel,setStatusRemoveLevel] = useState<number>(0)//RemoveLevel

  

  const countLevels = async () => {
    try{
      const tl = await api.get(`totalLevels/${userData?.account_id}/${status}`)
      setTotalLevels(tl.data.response)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{ countLevels() },[status,newLevel,editLevel,removeLevel])

  const changeStatus = [{'status':0,'name':'Níveis Inativos'},{'status':1,'name':'Níveis Ativos'}]

  
  return(
    userData === null ? <Loading/> : (
      <div className="flex flex-col">
        <TitlePage 
          icon="faKey" 
          title="Configurações | Níveis de Acesso" 
          rightComponent={<Button btn="success" icon="faPlus" name="Adicionar Novo Nível" onClick={()=>setNewLevel(true)}/>}/>

        <div className="bg-white p-2 rounded shadow flex justify-between items-center">
          <p className="text-slate-400 flex-1 font-medium">
            { totalLevels === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando ...</p> 
            : `${totalLevels} - Níveis de Acesso`} 
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
              <PageLevels 
                account_id={userData.account_id}
                page={1} 
                status={status}
                newLevel={newLevel}
                editLevel={editLevel} setEditLevel={setEditLevel}
                removeLevel={removeLevel} setRemoveLevel={setRemoveLevel}
                setNameRemoveLevel={setNameRemoveLevel} setStatusRemoveLevel={setStatusRemoveLevel}/>  
            </tbody>
          </table>
        }/>
        {newLevel && <Modal component={<NewLevel setNewLevel={setNewLevel} account_id={userData.account_id}/>} />}
        {editLevel && <Modal component={<EditLevel editLevel={editLevel} setEditLevel={setEditLevel}/>}/>}
        {removeLevel && <Modal component={<RemoveLevel name={nameRemoveLevel} status={statusRemoveLevel} removeLevel={removeLevel} setRemoveLevel={setRemoveLevel}/>}/>}
      </div>
    )
  )
}

type PageLevelsDTO = {
  account_id:number;
  status: number;
  page: number;
  newLevel: boolean;
  editLevel: number | null;
  removeLevel: number | null;
  setEditLevel: React.Dispatch<React.SetStateAction<number|null>>;
  setRemoveLevel: React.Dispatch<React.SetStateAction<number|null>>;
  setNameRemoveLevel: React.Dispatch<React.SetStateAction<string>>;
  setStatusRemoveLevel: React.Dispatch<React.SetStateAction<number>>;
}

const PageLevels: React.FC<PageLevelsDTO> = (props) => {
  const [ levels, setLevels ] = useState<LevelDTO[] | null>(null)
  const listLevels = async () => {
    try{
      const tl = await api.get(`listLevels/${props.account_id}/${props.status}/${props.page}`)
      setLevels(tl.data.response)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{ listLevels() },[props.status,props.newLevel,props.editLevel,props.removeLevel])
  
  return(
    levels === null ? <p><FontAwesomeIcon className="text-blue-400" icon={Fas.faCircleNotch} pulse/> Carregando ...</p>
    : levels ? 
      levels.map((level,key)=>
        <tr key={key} className="odd:bg-white odd:hover:bg-slate-100 even:bg-slate-200 even:hover:bg-slate-300 text-center text-slate-600">
          <td>{level.id}</td>
          <td>{level.name}</td>
          <td>{level.description}</td>
          <td>{level.status == 1 ? 'Ativo' : 'Inativo'}</td>
          <td className="flex justify-end">
            <Button icon="faEdit" btn='info' size='sm' onClick={()=>props.setEditLevel(level.id)}/>
            <Button icon={`${level.status == 1 ? "faTrash" : "faCheck"}`}
                    btn={`${level.status == 1 ? "error" : "success"}`} size='sm' onClick={()=>{props.setRemoveLevel(level.id),props.setNameRemoveLevel(level.name),props.setStatusRemoveLevel(level.status == 1 ? 0 : 1)}}/>
          </td>
        </tr>
      ) 
    : <tr className="bg-slate-50 text-center"><td colSpan={5}>Nenhum nível localizado</td></tr>
  )
}