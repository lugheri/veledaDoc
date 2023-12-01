import { Button } from "../../../../../../components/Button"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';

export const RemoveCredential: React.FC<{name:string,status:number,removeCredential:number|null,setRemoveCredential:React.Dispatch<React.SetStateAction<number|null>>}> = (props) => {
  const saveChangeCredential = async () => {
    try{
      props.setRemoveCredential(null)   
      const data = {"status":props.status}
      await api.patch(`updateCredential/${props.removeCredential}`, data)        
    }catch(e){
      console.log(e)
    }
  }  
  return (
    <div className="flex flex-col">
      <TitleModal 
        icon={`${props.status == 1 ? 'faCheck' : 'faTrash'}`} 
        close={()=>props.setRemoveCredential(null)} 
        title={`${props.status == 1 ? 'Reativar Cargo' : 'Desativar Cargo'}`}
        subtitle={`${props.status == 1 ? 'Reativar cargo' : 'Desativar cargo'}`}/>
      <div className="flex flex-col flex-1">
        <p className="py-4 px-2 text-slate-500">
          { props.status == 1 ? `Confirmar reativação do cargo ${props.name}?`
            : `Desativar a reativação do cargo ${props.name}?`}
        </p>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setRemoveCredential(null)} />
        <Button
          name={`${props.status == 1 ? 'Reativar cargo' : 'Desativar cargo'}`} 
          icon={`${props.status == 1 ? 'faCheck' : 'faTrash'}`}  
          btn={`${props.status == 1 ? 'success' : 'error'}`} 
          onClick={()=>saveChangeCredential()} /> 
      </div> 
    </div>   
  )
}

