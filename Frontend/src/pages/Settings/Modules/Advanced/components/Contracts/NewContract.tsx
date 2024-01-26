import { useState,FormEvent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import { Modal, TitleModal } from "../../../../../../components/Modal"
import { Button } from '../../../../../../components/Button';
import { InputForm, TextAreaForm } from '../../../../../../components/Inputs';
import api from '../../../../../../services/api';

type INewContractComponent = {
  close:React.Dispatch<React.SetStateAction<boolean>>
}
export const NewContract: React.FC<INewContractComponent> = (props) => {
  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ error, setError ] = useState("")
  const newContract = async (e:FormEvent) => {
    e.preventDefault()
    try{
      const data = {name:name,description:description}
      const r = await api.post('newContract',data)
      if(r.data.error){ 
        setError(r.data.message)
      }else{
        props.close(false)
      }
    }catch(err){console.log(err)}

  }
  return(
    <Modal className="w-1/3" component={
      <form onSubmit={(e)=>newContract(e)}>
        <TitleModal icon="faPlus" title="Criar Novo Contrato" close={()=>props.close(false)}/>
        <InputForm label="Nome do Contrato" required value={name} onChange={setName}/>
        <TextAreaForm label="Breve Descrição do Contrato" value={description} onChange={setDescription}/>
        {error && <p className="text-red-500"><FontAwesomeIcon className="opacity-50" icon={Fas.faExclamationTriangle}/> {error} </p>}
        <div className="flex justify-end">
          <Button name="Cancelar" btn="muted" onClick={()=>props.close(false)}/>
          <Button btn='info' icon="faFileSignature" name="Criar Contrato" submit/>
        </div>
      </form>
    }/>
  )
}