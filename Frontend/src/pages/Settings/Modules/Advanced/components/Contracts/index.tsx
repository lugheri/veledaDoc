import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import { IContract } from '../../Dto/contracts.dto';

import api from '../../../../../../services/api';

import { Loading } from '../../../../../../components/Loading';
import { Button } from '../../../../../../components/Button';
import { NewContract } from './NewContract';



export const Contracts = () => {
  const [ newContract, setNewContract] = useState(false)  
  return(
    <div className="flex flex-wrap w-full bg-white rounded-md shadow mt-1 p-4">
      <PageContracts page={1} status={1} update={newContract} setNewContract={setNewContract}/>
      {newContract && <NewContract close={setNewContract}/>}
    </div>
  )
}


type IPageContractsComponent = {
  page:number,
  status:number,
  update:boolean,
  setNewContract:React.Dispatch<React.SetStateAction<boolean>>
}
const PageContracts : React.FC<IPageContractsComponent> = (props) => {
  const [ contracts, setContracts ] = useState<null|IContract[]>(null)
  const [ error, setError ] = useState("")
  const getContracts = async () => {
    try{
      const list = await api.get(`listContracts/${props.page}/${props.status}`)
      if(list.data.error){
        setError(list.data.message)
        setContracts([])
        return
      }
      setContracts(list.data.response)      
    }catch(err){console.log(err)}
  }
  useEffect(()=>{getContracts()},[props.update])

  return(
    <>
      { error && <p className="text-red-500">{error}</p>}
      { contracts === null ? <Loading/> 
        : contracts.length == 0 ? props.page == 1 &&
          <div className="flex flex-col justify-center items-center">
            <FontAwesomeIcon className="text-6xl my-4 text-sky-500/40" icon={Fas.faFileSignature}/>
            <p className="text-neutral-500 text-xl font-light">Nenhum Contrato Configurado</p>
            <Button 
              btn="info" type="outline" name="Criar Contrato" icon="faFileCirclePlus" 
              onClick={()=>props.setNewContract(true)}/>
          </div>
        : <>
            <div 
              className="flex py-4 flex-col justify-center items-center w-[15.5%] h-[200px] my-1 mx-[.5%] bg-blue-400/80 cursor-pointer hover:bg-blue-400 border border-blue-500 rounded shadow-neutral-500/30 shadow-md"
              onClick={()=>props.setNewContract(true)}>
              <FontAwesomeIcon className="text-slate-50/80 my-4 text-6xl" icon={Fas.faPlus}/>
              <p className="text-slate-50 text-sm">Adicionar Contrato</p>      
            </div>    
            {contracts.map((contract,key)=><ContractItem key={key} contract={contract} />)}
          </>
      }
    </>
  )
}

//Contract Item Component
type IContractItemComponent = {
  contract:IContract
}
const ContractItem : React.FC<IContractItemComponent> = (props) => {
  const navigate = useNavigate();
  const openContract = () => {
    const route = `/settings/advanced/openContract/${props.contract.id}`
    navigate(route)
  }
  return(
    <div className="flex py-4 flex-col justify-between items-center w-[15.5%] h-[200px] my-1 mx-[.5%] bg-slate-300/60 hover:bg-slate-300/70 border border-slate-400 rounded shadow-neutral-500/30 shadow-md">
      <FontAwesomeIcon className="text-slate-500/50 mt-4 text-6xl" icon={Fas.faFileSignature}/>
      <p className="text-slate-800 text-xs font-semibold text-center">{ props.contract.name}</p>
      <Button 
        btn="info" name="Configurar" icon="faCogs" size="sm" onClick={()=>openContract()}/> 
    </div>    
  )
}