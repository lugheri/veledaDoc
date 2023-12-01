import { Button } from "../../../components/Button"
import { TitlePage } from "../../../components/TitlePage"

export const Procedures = () => {
  return(
  <div className="flex flex-col">
    <TitlePage 
      icon="faSyringe" 
      title="Procedimentos" 
      description="Gerencie todas as informações dos procedimentos de cada tratamento" 
      rightComponent={<Button icon="faPlus" btn="info" name="Novo Procedimento"/>}/>
  </div>)
}