import { Button } from "../../../../../../components/Button"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';

export const RemoveLevel: React.FC<{name:string,status:number,removeLevel:number|null,setRemoveLevel:React.Dispatch<React.SetStateAction<number|null>>}> = (props) => {
  const saveChangeLevel = async () => {
    try{
      props.setRemoveLevel(null)   
      const data = {"status":props.status}
      await api.patch(`updateLevel/${props.removeLevel}`, data)        
    }catch(e){
      console.log(e)
    }
  }
  
  return (
    <div className="flex flex-col">
      <TitleModal 
        icon={`${props.status == 1 ? 'faCheck' : 'faTrash'}`} 
        close={()=>props.setRemoveLevel(null)} 
        title={`${props.status == 1 ? 'Reativar Nível' : 'Desativar Nível'}`}
        subtitle={`${props.status == 1 ? 'Reativar nível de acesso' : 'Desativar nível de acesso'}`}/>
      <div className="flex flex-col flex-1">
        <p className="py-4 px-2 text-slate-500">
          { props.status == 1 ? `Confirmar reativação do nível ${props.name}?`
            : `Desativar a reativação do nível ${props.name}?`}
        </p>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setRemoveLevel(null)} />
        <Button
          name={`${props.status == 1 ? 'Reativar nível' : 'Desativar nível'}`} 
          icon={`${props.status == 1 ? 'faCheck' : 'faTrash'}`}  
          btn={`${props.status == 1 ? 'success' : 'error'}`} 
          onClick={()=>saveChangeLevel()} /> 
      </div> 
    </div>   
  )
}

