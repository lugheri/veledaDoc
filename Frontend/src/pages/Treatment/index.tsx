import { Button } from "../../components/Button"
import { TitlePage } from "../../components/TitlePage"

export const Treatment = () => {
  return(
  <div className="flex flex-col">
    <TitlePage 
      icon="faFlaskVial" 
      title="Tratamentos"
      description="Cadastre os tratamentos disponíveis com seus procedimentos" 
      rightComponent={<Button icon="faPlus" btn="info" name="Novo Tratamento"/>}/>
    
  </div>
  )
}