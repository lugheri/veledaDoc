import {useState,useEffect,FormEvent} from 'react';
import { Button } from "../../../../../../components/Button"
import { InputForm, TextAreaForm } from "../../../../../../components/Inputs"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';

export const EditTeam: React.FC<{editTeam:number|null,setEditTeam:React.Dispatch<React.SetStateAction<number|null>>}> = (props) => {
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')

  const getInfoLevel = async () => {
    try{
      const info = await api.get(`getTeam/${props.editTeam}`)
      setName(info.data.response.name)
      setDescription(info.data.response.description)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{getInfoLevel()},[])
  
  const saveChangesTeam = async (e:FormEvent) => {
    e.preventDefault()
    try{
      props.setEditTeam(null)   
      const data = {"name":name,"description":description}
      await api.patch(`updateTeam/${props.editTeam}`, data)        
    }catch(e){
      console.log(e)
    }
  }
  return (
    <form className="flex flex-col" onSubmit={(e)=>saveChangesTeam(e)}>
      <TitleModal icon='faEdit' close={()=>props.setEditTeam(null)} title='Editar Equipe' subtitle='Editar informações da equipe' />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col w-full ">
          <InputForm label="Nome" required placeholder='Nome da Equipe' value={name} onChange={setName}/>
        </div>
        <div className="flex flex-col w-full ">
          <TextAreaForm label="Descrição" placeholder='Breve Descrição' value={description} onChange={setDescription}/>
        </div>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setEditTeam(null)} />
        <Button submit name="Salvar Alterações" icon="faSave" btn="info" /> 
      </div> 
    </form>    
  )
}


