import { Button } from "../../../../../../components/Button"
import { SubTitle } from "../../../../../../components/Subtitle"

export const AvailableTreatments = () => {
  return(
    <div className="flex flex-col w-full bg-white rounded-md shadow mt-1 p-4">   
      <div className="flex justify-between items-center flex-1 border-b border-slate-100">
        <SubTitle icon="faVialCircleCheck" title="Configure os tratamentos disponiveis"/>
        <Button btn="info" icon="faPlus" type="notline" name="Adicionar Tratamento"/>
      </div>
      
      
    </div>
  )
}