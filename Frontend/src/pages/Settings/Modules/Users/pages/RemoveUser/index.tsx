import { Button } from "../../../../../../components/Button"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';

type RemoveUserDTO = {
  setEditUser:React.Dispatch<React.SetStateAction<number|null>>,
  name:string,
  status:number,
  removeUser:number|null,
  setRemoveUser:React.Dispatch<React.SetStateAction<number|null>>
}
export const RemoveUser: React.FC<RemoveUserDTO> = (props) => {
  const saveChangeUser = async () => {
    try{
      props.setRemoveUser(null)   
      const data = {"status": props.status == 1 ? 0 : 1 }
      await api.patch(`updateUser/${props.removeUser}`, data)        
    }catch(e){
      console.log(e)
    }
  }
  const editUser = () => {
    props.setEditUser(props.removeUser)
    props.setRemoveUser(null)
  }
  
  return (
    <div className="flex flex-col">
      <TitleModal 
        icon={`${props.status == 1 ? 'faUserCheck' : 'faUserSlash'}`} 
        close={()=>props.setRemoveUser(null)} 
        title={`${props.status == 1 ? 'Inativar Usuário' : 'Reativar Usuário'}`}
        subtitle={`${props.status == 1 ? 'Inativar o acesso deste Usuário' : 'Reativar o acesso deste Usuário'}`}/>
      <div className="flex flex-col flex-1">
        <p className="py-4 px-2 text-slate-500">
          { props.status == 1 ? `Confirmar a inativação do usuário ${props.name}?`
            : `Confirmar a reativação do usuário ${props.name}?`}
        </p>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>editUser()} />
        <Button
          name={`${props.status == 1 ? 'Inativar Usuário' : 'Reativar Usuário'}`} 
          icon={`${props.status == 1 ? 'faUserSlash' : 'faUserCheck'}`}  
          btn={`${props.status == 1 ? 'error' : 'success'}`} 
          onClick={()=>saveChangeUser()} /> 
      </div> 
    </div>   
  )
}

