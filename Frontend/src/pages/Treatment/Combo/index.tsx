import { Button } from "../../../components/Button"
import { TitlePage } from "../../../components/TitlePage"

export const Combo = () => {
  return(
  <div className="flex flex-col">
    <TitlePage 
      icon="faCubes" 
      title="Pacotes" 
      description="Crie pacotes de tratamentos" 
      rightComponent={<Button icon="faPlus" btn="info" name="Novo Pacote"/>}/>
  </div>)
}