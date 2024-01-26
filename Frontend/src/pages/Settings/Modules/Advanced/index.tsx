import { useState } from "react"
import { Button } from "../../../../components/Button"
import { TitlePage } from "../../../../components/TitlePage"
import { AvailableTreatments } from "./components/AvailableTreatments"
import { Contracts } from "./components/Contracts"


export const Advanced = () => {
  const [ page, setPage ] = useState<'accounts'|'available_treatments'|'contracts'>('accounts')
  return(
    <div className="flex flex-col py-2">
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
          name="Tratamentos" 
          btn="info" 
          type={ page == 'available_treatments' ? "default" : "notline"} 
          size="sm" 
          icon="faVialCircleCheck" 
          onClick={()=>setPage('available_treatments')} />
        <Button 
          name="Contratos" 
          btn="info" 
          type={ page == 'contracts' ? "default" : "notline"} 
          size="sm" 
          icon="faFileSignature" 
          onClick={()=>setPage('contracts')} />
      </div>
      { page === 'accounts' ? (
        <p>Accounts</p>
      ) : page === 'available_treatments' ? (
        <AvailableTreatments/>
      ) : page === 'contracts' ? (
        <Contracts/>
      ) : (
        <p>404</p>
      )}
      
    </div>
  )
}