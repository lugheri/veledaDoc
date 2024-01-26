import { Button } from "../../components/Button"
import { TitlePage } from "../../components/TitlePage"

export const Patients = () => {
  return(
    <div className="flex flex-col">
      <TitlePage 
        icon="faHospitalUser" 
        title="Pacientes"
        description="Gerencie todos os pacientes da clínica"
        rightComponent={<Button icon="faUserPlus" name="Cadastrar Paciente" btn="success"/>}/>
    </div>
  )
}