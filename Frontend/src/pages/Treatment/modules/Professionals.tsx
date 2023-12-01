import { Button } from "../../../components/Button"
import { TitlePage } from "../../../components/TitlePage"

export const Professionals = () => {
  return(
  <div className="flex flex-col">
    <TitlePage 
      icon="faUserDoctor" 
      title="Especialistas e Profissionais" 
      description="Cadastre os profissionais responsávies pelos procedimentos!" 
      rightComponent={<Button icon="faUserPlus" btn="info" name="Cadastrar Novo Profissional"/>}/>
  </div>)
}