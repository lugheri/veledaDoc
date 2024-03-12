import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NavLink, useLocation } from 'react-router-dom';
import api from '../../../services/api';
import { User } from '../../../contexts/Dtos/auth.dto';

type Props = {
  side:'open'|'closed',
  setSide:React.Dispatch<React.SetStateAction<'open'|'closed'>>,
  levelId:number,
  userData:User
}

export const Sidebar = (props:Props) => { 
  const changeSide = () =>{props.setSide(props.side=='open'?'closed':'open')}
  const location = useLocation();
  const pageActive = location.pathname
  const pageMain = location.pathname.split('/')[1]
  const getDate = () => {
    const data = new Date();
    const weekDays = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]    
    const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]    
    const diaSemana = data.getDay();
    const dia = data.getDate();   
    const mes = data.getMonth() 
    const ano = data.getFullYear();
    return `${weekDays[diaSemana]}, ${dia} de ${months[mes]} de ${ano}`
  }
  
  type itemSide = {
    id: number;
    parent: number;
    name: string;
    alias: string | null;
    icon:null | keyof typeof Fas ;
    description: string | null;
    type:string;
    order: number;
    status: number;
  }
  const [ retry, setRetry ] = useState<number>(0)
  const [ menu, setMenu ] = useState<itemSide[]>([])
  const [ menuSettings, setMenuSettings ] = useState<itemSide[]>([])
  const getMenu = async() => {
    if(props.levelId==0){
      if(retry<=10){
        const tent = retry+1
        setRetry(tent)
      }
    }
    try{
      const type='side'
      const parentModule=0
      const menuItems = await api.get(`modules/${props.userData.account_id}/${type}/${parentModule}/${props.levelId}`)     
      setMenu(menuItems.data.response)
      const typeSettings='set'  
      const menuSetItems = await api.get(`modules/${props.userData.account_id}/${typeSettings}/${parentModule}/${props.levelId}`)
      setMenuSettings(menuSetItems.data.response)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      getMenu()
    },500)
    
  },[retry])

  return(
    <div className={`flex flex-col ${props.side == 'open' ?  "w-[270px] bg-slate-200" : "w-[51px] bg-slate-50"}  ease-in duration-150 drop-shadow-md relative`}>
      <div className="absolute w-[50px] h-full flex flex-col justify-start items-center pt-2">
        <button className="opacity-90 hover:opacity-100 text-xl" onClick={changeSide}>
          <FontAwesomeIcon icon={Fas.faBarsStaggered}/>
        </button>
        <ul className={`${props.side == 'open' ? "w-[270px]  h-[82vh] overflow-auto" : "w-[50px]" } pt-2 z-10 absolute left-0 top-[125px] flex flex-col justify-between`}>
          <div>
          { menu.length == 0 ? (<div className="w-[50px] h-[500px] flex justify-center items-center text-blue-500"><FontAwesomeIcon icon={Fas.faCircleNotch} pulse/></div>)
          : menu.map((item:itemSide, index: number)=>(
            <div key={index}>
              <ModuleItem               
                to={`/${item.name}`} 
                pageActive={pageActive}
                side={props.side} 
                moduleId={item.id}
                name={ item.alias ? item.alias : '' } 
                icon={ item.icon ? item.icon : null}/>  
                { item.name === pageMain && <SubModulesMenu account_id={props.userData.account_id} levelId={props.levelId} side={props.side} parentModule={item.id} module={item.name}/>  }
            </div>
          ))}
          </div>
          <div className="mt-4">
          { menuSettings.length == 0 ? false
          : menuSettings.map((item:itemSide, index: number)=>(
            <div key={index}>
              <ModuleItem 
                key={index}
                to={`/${item.name}`} 
                pageActive={pageActive}
                side={props.side} 
                moduleId={item.id}
                name={ item.alias ? item.alias : '' } 
                icon={ item.icon ? item.icon : null}/> 
                { item.name === pageMain && <SubModulesMenu account_id={props.userData.account_id} levelId={props.levelId} side={props.side} parentModule={item.id} module={item.name}/>  } 
                <SideExitButton side={props.side}/>  
            </div> 
          ))}
          </div>
        </ul>
      </div>
      {/*BRAND */}
      <div className={`${props.side == 'open' ? "bg-slate-50 w-[220px] ml-[50px] flex flex-col items-center h-full drop-shadow-md block" : "w-0"} ease-in duration-300 `}>
        <div className="h-14 w-[220px] flex justify-center items-center text-center">
          <p className="tracking-tighter text-xl p-2 m-0 text-blue-950 font-thin">
            <span className="font-bold border-b-blue-400 border-b border-b-4">MEGA</span> CRM</p> 
        </div>  
        <div className={`${props.side == 'open' ? 'inline' : 'hidden'} flex flex-col justify-center items-center`}>
          <p className="text-sm text-slate-500">{props.userData.account_id} Account Name</p>
          <p className="text-xs text-blue-500">{getDate()}</p>
        </div>  
      </div>
    </div>
  )
}




type ModuleItemProps = {
  to: string;
  pageActive:string
  icon:keyof typeof Fas | null;
  name?:string;
  moduleId:number;
  side:'open'|'closed';
};

const ModuleItem = (props:ModuleItemProps ) => {
  const page = props.pageActive.split('/')[1]
  const isActiveSide = `/${page}` === props.to
 
  const navDefault = "flex w-full justify-start items-center font-semibold  text-slate-500 opacity-100 z-10 hover:opacity-100 ease-in duration-150"
  const navActive = "flex w-full justify-start items-center font-semibold  text-blue-500 opacity-100"

  const navDefaultClosed = "flex z-10 flex-col relative group w-full justify-center items-center text-slate-500 opacity-70 hover:opacity-100 ease-in duration-150"
  const navActiveClosed = "flex flex-col relative group w-full justify-center items-center text-blue-500 opacity-100"
 
  return(
    props.side == 'open' ? (
      <NavLink
        to={props.to}
        className={({ isActive, isPending }) =>isActive ? navActive : isPending ? navDefault : navDefault}>
        {props.icon ? (
          <div className={`w-[50px] ${isActiveSide ? "h-[50px] text-white bg-blue-500": "h-[40px]"} flex justify-center items-center mr-4`}>
            <FontAwesomeIcon className={`${isActiveSide ? " opacity-100" : "text-slate-500"}`} icon={Fas[props.icon] as IconProp}/>
          </div>) : false}
          {props.name ? (<p className="text-sm font-normal ">{props.name}</p>) : false}      
      </NavLink>
    ):(
      <NavLink
        className={({ isActive, isPending }) =>isActive ? navActiveClosed : isPending ? navDefaultClosed : navDefaultClosed}
        to={props.to}>
        {props.icon ? (
          <div className={`w-[50px] ${isActiveSide ? "h-[50px] bg-blue-500 text-white": "h-[40px]"} flex justify-center items-center`}>
            <FontAwesomeIcon className="py-1" icon={Fas[props.icon] as IconProp}/>
          </div>
        ) : false}  
        {props.name ? (<p className={`${isActiveSide ? "bg-blue-500 text-white":"bg-slate-50"} min-w-[150px] h-[50px] justify-start px-4 items-center hidden group-hover:flex absolute z-10 left-[49px] text-center transition text-sm duration-150 ease-out hover:ease-in`}>{props.name}</p>) : false}         
      </NavLink>
    )
  )  
}

type SubModuleProps = {
  account_id:number,
  parentModule:number; 
  module:string; 
  levelId:number; 
  side:'open'|'closed';
}

const SubModulesMenu = (props:SubModuleProps) => {
  type itemSide = {
    id: number;
    parent: number;
    name: string;
    alias: string | null;
    icon:null | keyof typeof Fas ;
    description: string | null;
    type:string;
    order: number;
    status: number;
  }
  const [ subModules, setSubModules ] = useState<itemSide[]|null>()
  const getSubModules = async () => {
    try{
      const type='side'
      const menuItems = await api.get(`modules/${props.account_id}/${type}/${props.parentModule}/${props.levelId}`)
      setSubModules(menuItems.data.response) 
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{ setTimeout(()=>{getSubModules()},500)},[])

  return(
    subModules === null ? <div className="w-[50px] h-[500px] flex justify-center items-center text-blue-500"><FontAwesomeIcon icon={Fas.faCircleNotch} pulse/></div>
    : subModules?.length ? subModules.map((subModule,key)=>
      <SubModuleItem 
        key={key} 
        to={`/${props.module}/${subModule.name}`} 
        side={props.side} 
        name={subModule.alias?subModule.alias:''} 
        icon={subModule.icon}/>)
    : false    
  )
}




type SubModuleItemProps = {
  to: string;
  name:string;
  icon:keyof typeof Fas | null;
  side:'open'|'closed';
};

const SubModuleItem : React.FC<SubModuleItemProps> = (props) => {
  const location = useLocation();  
  const isActiveSide = location.pathname === props.to

  const navDefault = "flex w-full pl-[75px] mt-1 mb-2 justify-start items-center font-semibold  text-slate-500 opacity-80 hover:opacity-100 ease-in duration-150"
  const navActive = "flex w-full pl-[75px] mt-1 mb-2  justify-start items-center font-semibold  text-blue-500 opacity-100"
  const navDefaultClosed = "flex z-10 flex-col relative group w-full justify-center items-center text-slate-500 opacity-70 hover:opacity-100 ease-in duration-150"
  const navActiveClosed = "flex flex-col relative group w-full justify-center items-center text-blue-500 opacity-100"
 
  return(
    props.side == 'open' ? (
      <NavLink
        to={props.to}
        className={({ isActive, isPending }) =>isActive ? navActive : isPending ? navDefault : navDefault}>
        {props.name ? (<p className="text-sm font-normal">{props.name}</p>) : false}      
      </NavLink>
    ):(
      <NavLink
        className={({ isActive, isPending }) =>isActive ? navActiveClosed : isPending ? navDefaultClosed : navDefaultClosed}
        to={props.to}>
        {props.icon ? (
          <div className={`w-[50px] ${isActiveSide ? "h-[30px] bg-blue-500 text-white": "h-[30px]"} flex justify-center items-center`}>
            <FontAwesomeIcon className="py-1 text-xs" icon={Fas[props.icon] as IconProp}/>
          </div>
        ) : false}  
        {props.name ? (<p className={`${isActiveSide ? "bg-blue-500 text-white":"bg-slate-50"} min-w-[150px] h-[30px] justify-start px-4 items-center hidden group-hover:flex absolute z-10 left-[49px] text-center transition text-sm duration-150 ease-out hover:ease-in`}>{props.name}</p>) : false}         
      </NavLink>
    )
  )  
}


const SideExitButton : React.FC<{side:'open'|'closed'}> = (props) => {
  return(
    props.side == 'open' ? (
      <button onClick={()=>{}} className={`flex w-full justify-start items-center font-semibold group text-red-800`}>
        <div className="w-[50px] h-[50px] flex justify-center items-center mr-4 group-hover:bg-red-500  ease-in duration-300">
          <FontAwesomeIcon className="text-red-600 group-hover:hidden ease-in duration-150" icon={Fas.faDoorClosed}/>
          <FontAwesomeIcon className="hidden group-hover:inline text-white ease-in duration-150" icon={Fas.faDoorOpen}/>
        </div>
        <p className="text-sm font-normal hidden group-hover:inline">Sair</p>     
      </button>
    ):(
      <button onClick={()=>{}} className="flex z-10 flex-col relative group w-full justify-center items-center text-red-600 opacity-70 hover:opacity-100 ease-in duration-150">
        <div className="w-[50px] h-[50px] group-hover:bg-red-500 flex justify-center items-center">
          <FontAwesomeIcon className="text-red-600 group-hover:hidden ease-in duration-150" icon={Fas.faDoorClosed}/>
          <FontAwesomeIcon className="hidden group-hover:inline text-white ease-in duration-150" icon={Fas.faDoorOpen}/>
        </div>
        <p className="bg-red-500 text-white min-w-[150px] h-[50px] justify-start px-4 items-center hidden  group-hover:flex absolute z-10 left-[50px] text-center transition text-sm duration-150 ease-out hover:ease-in">Sair</p>         
      </button>
    )
  )
}