import { useState } from 'react';
import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"
import useAuth from '../../hooks/useAuth';
import { User } from '../../contexts/Dtos/auth.dto';
import { Loading } from '../Loading';

export const Template = () => {
  const [ side, setSide ] = useState<'open'|'closed'>('open')
  const authenticate = useAuth();  
  const userData:User|null = authenticate ? authenticate.userData : null
  const levelId = authenticate ? authenticate.levelAccess : 0

  return (
    userData === null ? <Loading/>
    : (
      <div className="bg-[#ececec] flex h-screen w-screen overflow-y-auto overflow-x-hidden">
        <Sidebar userData={userData} levelId={levelId} side={side} setSide={setSide}/>
        <div className="flex flex-col w-screen overflow-auto">
          <Navbar side={side} userName={userData.name} credential={userData.credential}/>
          <div className="h-[92.5vh] bg-slate-200 overflow-auto">
            <Outlet/>
          </div>
        </div>      
      </div>
    )
  )
}