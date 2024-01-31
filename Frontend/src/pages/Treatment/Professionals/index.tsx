import { useState } from "react"
import { Button } from "../../../components/Button"
import { TitlePage } from "../../../components/TitlePage"
import { ListProfessionals } from "./ListProfessionals"

export const Professionals = () => {
  const clientId = 1000
  const [ addProfessional, setAddProfessional ] = useState(false)
  return(
  <div className="flex flex-col">
    <TitlePage 
      icon="faUserDoctor" 
      title="Especialistas e Profissionais" 
      description="Cadastre os profissionais responsávies pelos procedimentos!" 
      rightComponent={
        <Button 
          icon="faUserPlus" 
          btn="info" 
          type="notline" 
          name="Cadastrar Novo Profissional"
          onClick={()=>setAddProfessional(true)}/>
        }/>
    <ListProfessionals 
      clientId={clientId} 
      setAddProfessional={setAddProfessional}
      addProfessional={addProfessional}/> 
  </div>)
}