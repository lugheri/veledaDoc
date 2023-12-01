import { Button } from "../../../../../../components/Button"
import { TitleModal } from "../../../../../../components/Modal"
import api from '../../../../../../services/api';

export const RemoveTeam: React.FC<{name:string,status:number,removeTeam:number|null,setRemoveTeam:React.Dispatch<React.SetStateAction<number|null>>}> = (props) => {
  const saveChangeTeam = async () => {
    try{
      props.setRemoveTeam(null)   
      const data = {"status":props.status}
      await api.patch(`updateTeam/${props.removeTeam}`, data)        
    }catch(e){
      console.log(e)
    }
  }
  
  return (
    <div className="flex flex-col">
      <TitleModal 
        icon={`${props.status == 1 ? 'faCheck' : 'faTrash'}`} 
        close={()=>props.setRemoveTeam(null)} 
        title={`${props.status == 1 ? 'Reativar Equipe' : 'Desativar Equipe'}`}
        subtitle={`${props.status == 1 ? 'Reativar equipe' : 'Desativar equipe'}`}/>
      <div className="flex flex-col flex-1">
        <p className="py-4 px-2 text-slate-500">
          { props.status == 1 ? `Confirmar reativação da equipe ${props.name}?`
            : `Confirmar a inativação da equipe ${props.name}?`}
        </p>
      </div>
      <div className="flex border-t mt-4 p-2 justify-end items-center">
        <Button name="Cancelar" btn="muted"  type='outline' onClick={()=>props.setRemoveTeam(null)} />
        <Button
          name={`${props.status == 1 ? 'Reativar Equipe' : 'Desativar Equipe'}`} 
          icon={`${props.status == 1 ? 'faCheck' : 'faTrash'}`}  
          btn={`${props.status == 1 ? 'success' : 'error'}`} 
          onClick={()=>saveChangeTeam()} /> 
      </div> 
    </div>   
  )
}

