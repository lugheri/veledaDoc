import {useState,useEffect,FormEvent} from 'react';
import { Button } from "../../../../../../components/Button"
import { InputForm, TextAreaForm } from "../../../../../../components/Inputs"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';

type Props = {
  account_id:number;
  editLevel:number|null,
  setEditLevel:React.Dispatch<React.SetStateAction<number|null>>
}
export const EditLevel = (props:Props) => {
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')

  const getInfoLevel = async () => {
    try{
      const info = await api.get(`getLevel/${props.editLevel}`)
      setName(info.data.response.name)
      setDescription(info.data.response.description)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{getInfoLevel()},[])
  
  const saveChangesLevel = async (e:FormEvent) => {
    e.preventDefault()
    try{
      props.setEditLevel(null)   
      const data = {"name":name,"description":description}
      await api.patch(`updateLevel/${props.editLevel}`, data)        
    }catch(e){
      console.log(e)
    }
  }
  return (
    <form className="flex flex-col" onSubmit={(e)=>saveChangesLevel(e)}>
      <TitleModal icon='faEdit' close={()=>props.setEditLevel(null)} title='Editar Nível' subtitle='Editar nível de acesso' />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col w-full ">
          <InputForm label="Nome" required placeholder='Nome do Nível' value={name} onChange={setName}/>
        </div>
        <div className="flex flex-col w-full ">
          <TextAreaForm label="Descrição" placeholder='Breve Descrição' value={description} onChange={setDescription}/>
        </div>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setEditLevel(null)} />
        <Button submit name="Salvar Alterações" icon="faSave" btn="info" /> 
      </div> 
    </form>    
  )
}


