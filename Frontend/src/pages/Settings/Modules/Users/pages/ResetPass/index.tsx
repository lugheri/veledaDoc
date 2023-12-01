import {useState} from 'react';
import { Button } from "../../../../../../components/Button";
import { TitleModal } from "../../../../../../components/Modal";
import api from '../../../../../../services/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Far from "@fortawesome/free-regular-svg-icons";

type ResetPassDTO = {
  resetPass:number,
  name:string,
  setEditUser:React.Dispatch<React.SetStateAction<number|null>>,
  setResetPass:React.Dispatch<React.SetStateAction<number|null>>
}
export const ResetPass: React.FC<ResetPassDTO> = (props) => {
  const [ reseted, setReseted ] = useState<boolean>(false)
  const resetPass = async () => {
    try{
      setReseted(true)
       
      const data = {"password":'1234abc@',"reset": 1 }
      await api.patch(`updateUser/${props.resetPass}`, data)        
    }catch(e){
      console.log(e)
    }
  }
  const editUser = () => {
    props.setEditUser(props.resetPass)
    props.setResetPass(null)
  }
  const closeAll = () => {
    props.setEditUser(null) 
    props.setResetPass(null) 
    setReseted(true)
  }
  
  return (
    <div className="flex flex-col">
      <TitleModal icon={'faKey'} close={()=>props.setEditUser(null)} title={'Resset de Senha'}
                  subtitle={'Resetar a senha do usuário ativar o acesso deste Usuário'}/>
      { reseted ?
        <>
          <div className="flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={Far.faCircleCheck} className="mt-4 text-teal-400 text-6xl"/>
            <p className="px-2 mt-4 text-xl text-slate-500">Senha Resetada com sucesso!</p> 
            <p className="py-2 px-2 text-slate-500">
              A senha foi trocada para <b>1234abc@</b> e deve ser alterada no próximo acesso!
            </p> 
          </div> 
          <div className="flex border-t mt-4 p-2 justify-end items-center">
            <Button name="Voltar" btn="muted" type='notline' onClick={()=>{editUser()}} />
            <Button name="Concluir" btn="success" icon="faCheck" type='outline' onClick={()=>closeAll()} />
          </div>
        </>
      :
        <>
      <div className="flex flex-col flex-1">
        <p className="py-4 px-2 text-slate-500">
          Confirmar a reset de senha do usuário <b>{props.name}</b>?
        </p>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Fechar" btn="muted" type='notline' onClick={()=>{props.setEditUser(null),props.setResetPass(null)}} />
        <Button name="Voltar" btn="muted" type='outline' onClick={()=>editUser()} />
        <Button name={'Resetar Senha'} icon={'faKey'} btn={'info'} onClick={()=>resetPass()} /> 
      </div>
      </>} 
    </div>   
  )
}

