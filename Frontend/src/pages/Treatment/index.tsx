import { Card } from "../../components/Cards"
import { TitlePage } from "../../components/TitlePage"

import { User } from "../../contexts/Dtos/auth.dto";
import useAuth from "../../hooks/useAuth";

export const Treatment = () => {
  const authenticate = useAuth();  
  const userData:User|null = authenticate ? authenticate.userData : null

  return(
  <div className="flex flex-col">
    <TitlePage 
      icon="faFlaskVial" 
      title="Tratamentos"
      description="Cadastre os tratamentos disponíveis com seus procedimentos" />
  
    <div className="flex justify-center items-center px-2">
      <div className="flex flex-col flex-1 justify-center items-center">
        <Card component={<p>Resumo de Tratamentos</p>}/>  
        <Card component={<p>Resumo de Pacotes</p>}/>
      </div>
      <div className="flex w-1/3">
        <Card component={<p>Resumo de Profissionais</p>}/>
      </div>
    </div>
    
   
    
          
  </div>
  )
}