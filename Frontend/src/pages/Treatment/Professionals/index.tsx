import { useState } from "react"
import { Button } from "../../../components/Button"
import { TitlePage } from "../../../components/TitlePage"
import { ListProfessionals } from "./ListProfessionals"
import { Loading } from "../../../components/Loading"
import { User } from "../../../contexts/Dtos/auth.dto"
import useAuth from "../../../hooks/useAuth"

export const Professionals = () => {
  const authenticate = useAuth();  
  const userData:User|null = authenticate ? authenticate.userData : null

  const [ addProfessional, setAddProfessional ] = useState(false)
  return(
    userData === null ? (
      <Loading/>
    ) : (    
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
          clinicId={userData.account_id} 
          setAddProfessional={setAddProfessional}
          addProfessional={addProfessional}/> 
      </div>
  )
  )
}