import {useState,FormEvent} from 'react';
import { Button } from "../../../../../../components/Button"
import { InputForm, TextAreaForm } from "../../../../../../components/Inputs"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';

export const NewLevel: React.FC<{setNewLevel:React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  
  const createNewLevel = async (e:FormEvent) => {
    e.preventDefault()
    try{
      props.setNewLevel(false)   
      const data = {"name":name,"description":description,"status":1}
      await api.post(`newLevel`, data)        
    }catch(e){
      console.log(e)
    }
  }
  return (
    <form className="flex flex-col" onSubmit={(e)=>createNewLevel(e)}>
      <TitleModal icon='faPlus' close={()=>props.setNewLevel(false)} title='Adicionar Novo Nível' subtitle='Crie um novo nível de acesso' />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col w-full ">
          <InputForm label="Nome" required placeholder='Nome do Nível' value={name} onChange={setName}/>
        </div>
        <div className="flex flex-col w-full ">
          <TextAreaForm label="Descrição" placeholder='Breve Descrição' value={description} onChange={setDescription}/>
        </div>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setNewLevel(false)} />
        <Button submit name="Criar Nível" icon="faSave" btn="success" /> 
      </div> 
    </form>   
  )
}