import {useState,useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import * as Far from "@fortawesome/free-regular-svg-icons";
import api from '../../../services/api';
import { ICredential } from '../../../contexts/Dtos/auth.dto';
import { Loading } from '../../Loading';

type Props = {
  side:'open'|'closed',
  userName:string,
  credential:number
}

export const Navbar = (props:Props) => {
  const [ infoCredential, setInfoCredential ] = useState<ICredential|null>(null)  

  const getInfoCredential = async () => {
    try{
      const infoC = await api.get(`getCredential/${props.credential}`)
      setInfoCredential(infoC.data.response)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{setTimeout(()=>{getInfoCredential()},500)},[])


  return(
    infoCredential === null ? <Loading/> : (
      <div className="flex justify-between items-center px-4 h-14 bg-slate-100">        
        <div className={`${props.side == 'closed' && "ml-[150px]"} border border-slate-300 bg-white w-1/3 flex justify-start items-center`}>
          <FontAwesomeIcon className="px-2 text-slate-400 text-xs" icon={Fas.faSearch}/>
          <input className="w-full border-none text-xs hover:ring-0 hover:border-none" placeholder="Busque Módulos ou funções"/>
        </div>
        

        <div className="flex justify-center items-center">
          <div className="text-gray-900 border-r  border-slate-500 dark:text-gray-300 opacity-50 text-xl py-3 px-4 hover:opacity-100 cursor-pointer ">
            <FontAwesomeIcon icon={Far.faBell}/>
          </div>
          <div className="group text-xl p-2 cursor-pointer flex justify-center items-center">
            <FontAwesomeIcon className="text-3xl px-1 opacity-50 text-blue-400" icon={Fas.faUserCircle}/>
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm font-medium text-slate-500">{props.userName}</p>
              <p className="text-xs font-thin text-blue-500">{infoCredential.name}</p>
            </div>
          </div>
        </div>
      </div>
    )
  )
}