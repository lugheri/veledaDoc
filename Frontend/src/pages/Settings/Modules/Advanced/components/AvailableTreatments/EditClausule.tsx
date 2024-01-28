import { useState } from "react"
import { Button } from "../../../../../../components/Button"
import { Modal, TitleModal } from "../../../../../../components/Modal"
import { TextEditor } from "../../../../../../components/TextEditor"

type EditClausuleProps = {
  close:React.Dispatch<React.SetStateAction<boolean>>,
  textClausule:string,
  editClausule:React.Dispatch<React.SetStateAction<string>>,
}

export const EditClausule = (props:EditClausuleProps) => {
  const [ clausule, setClausule ] = useState(props.textClausule)
  const saveClausule = () => {  
    props.editClausule(clausule)
    props.close(false)
  }

  return(
    <Modal
      className="w-full"
      component={
        <div className="flex flex-col">
          <TitleModal
            icon="faFileContract"
            title="Editar Cláusulas do Contrato"
            subtitle="Altere as cláusulas do contrato deste tratamento"
            close={()=>props.close(false)}/>

          <TextEditor content={clausule} setContent={setClausule} />

          <div className="flex justify-end border-t border-slate-200 mt-4 pt-2">
            <Button 
              btn="muted"
              type="notline"
              name="Cancelar"
              onClick={()=>props.close(false)}
              />
            <Button 
              btn="success"
              icon="faFloppyDisk"
              name="Salvar Cláusulas"
              onClick={()=>saveClausule()}
              />  
          </div>
        </div>
      }
    />
  )
}