import { useState } from 'react';
import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"

export const Template = () => {
  const [ side, setSide ] = useState<'open'|'closed'>('open')
  return (
    <div className="bg-[#ececec] flex h-screen w-screen overflow-y-auto overflow-x-hidden">
      <Sidebar side={side} setSide={setSide}/>
      <div className="flex flex-col w-screen overflow-auto">
        <Navbar side={side}/>
        <div className="h-[92.5vh] bg-slate-200 overflow-auto px-4">
          <Outlet/>
        </div>
      </div>      
    </div>
  )
}