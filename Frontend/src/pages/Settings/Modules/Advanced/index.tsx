import { useState } from "react"
import { Button } from "../../../../components/Button"
import { TitlePage } from "../../../../components/TitlePage"


export const Advanced = () => {
  const [ page, setPage ] = useState<'accounts'|'contracts'>('accounts')
  return(
    <div className="">
      <TitlePage icon="faTools" title="Configurações Avançadas" 
      description="Gerencie todas as informações e contas do sistema"/>
        <div className="flex bg-white rounded-md shadow mt-1 p-1">
        <Button 
          name="Contas" 
          btn="info" 
          type={ page == 'accounts' ? "default" : "notline"} 
          size="sm" 
          icon="faHouseMedicalCircleCheck" 
          onClick={()=>setPage('accounts')} />
        <Button 
          name="Contratos" 
          btn="info" 
          type={ page == 'contracts' ? "default" : "notline"} 
          size="sm" 
          icon="faFileSignature" 
          onClick={()=>setPage('contracts')} />
      </div>
    </div>
     
  )
}