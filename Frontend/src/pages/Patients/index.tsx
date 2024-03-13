import { useState } from "react"
import { Button } from "../../components/Button"
import { TitlePage } from "../../components/TitlePage"
import { ListPatient } from "./ListPatients"
import { EditPatient } from "./EditPatient"
import { IPatient } from "./Dto/patient.dto"

export const Patients = () => {
  const clientId = 1000
  const [ addPatient, setAddPatient ] = useState(false)
  const [ editPatient, setEditPatient ] = useState<IPatient|null>(null)
 
  return(
    <>
      { editPatient ? (
        <EditPatient patient={editPatient} close={setEditPatient}/>
      ) : (
        <div className="flex flex-col">
          <TitlePage 
            icon="faHospitalUser" 
            title="Pacientes"
            description="Gerencie todos os pacientes da clínica"
            rightComponent={
              <Button 
                icon="faUserPlus" 
                name="Cadastrar Paciente" 
                btn="success"
                onClick={()=>setAddPatient(true)}/>}/>
          <ListPatient
            clientId={clientId}
            addPatient={addPatient}
            setAddPatient={setAddPatient}
            editPatient={editPatient} 
            setEditPatient={setEditPatient}/>
        </div>
      )}
    </>
  )
}