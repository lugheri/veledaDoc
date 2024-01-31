import { useState } from "react"
import { Button } from "../../../components/Button"
import { TitlePage } from "../../../components/TitlePage"
import { ListProcedures } from "./ListProcedures"

export const Procedures = () => {
  const clientId = 1000
  const [ addProcedure, setAddProcedure ] = useState(false)
  return(
  <div className="flex flex-col">
    <TitlePage 
      icon="faSyringe" 
      title="Procedimentos" 
      description="Gerencie todas as informações dos procedimentos de cada tratamento" 
      rightComponent={<Button icon="faPlus" btn="info" type="notline" name="Novo Procedimento"/>}/>
    <ListProcedures 
      clientId={clientId} 
      setAddProcedure={setAddProcedure}
      addProcedure={addProcedure}/> 
  </div>)
}