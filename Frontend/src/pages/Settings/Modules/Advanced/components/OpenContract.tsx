import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IContract } from "../Dto/contracts.dto";
import api from "../../../../../services/api";
import { TitlePage } from "../../../../../components/TitlePage";
import { Loading } from "../../../../../components/Loading";
import { Button } from "../../../../../components/Button";

export const OpenContract  = () => {
  const { contract_id } = useParams();
  const [ infoContract, setInfoContract ] = useState<null|IContract>(null)
  const [ error, setError ] = useState("")
  const getInfoContract = async () => {
    try{
      const info = await api.get(`infoContract/${contract_id}`)
      console.log(info.data)
      if(info.data.error){
        setError(info.data.message)
        return
      }
      setInfoContract(info.data.response)
    }catch(err){console.log(err)}
  }
  useEffect(()=>{getInfoContract()},[])

  const navigate = useNavigate();
  const advancedSetings = () => {
    const route = `/settings/advanced/`
    navigate(route)
  }
  return(
    <div className="flex flex-col">
      <TitlePage icon="faFileSignature" title="Configure do Contrato" 
      description="Configure todas as informações do contrato para geração do pdf!"
      rightComponent={<Button name="Fechar Contato" btn="muted" onClick={()=>advancedSetings()}/>}/>
      { infoContract === null 
      ? error 
        ? <p className="text-red-500">{error}</p> 
        : <Loading/>
      : <div> Open Contract - {infoContract?.name}</div> }    
    </div>
  )
}