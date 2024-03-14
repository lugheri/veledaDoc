import { ContractType } from "../controllers/Dtos/contracts.dto";
import { SysContracts, SysContractsInstance } from "../models/SysContracts";

class ContractService{
  async newContract(dataContract:ContractType):Promise<SysContractsInstance>{
    const [newContract,created] = await SysContracts.findOrCreate({
      where:{name:dataContract.name},
      defaults:dataContract
    })
    console.log(created)
    return newContract
  }

  async listContracts(page:number,status:number):Promise<SysContractsInstance[]>{
    const p = page-1
    const limit = 30
    const offset = limit*p
    const listContracts = await SysContracts.findAll({
      where:{status:status},
      order:[['id','DESC']],
      offset:offset,
      limit:limit
    })
    return listContracts
  }

  async infoContract(contract_id:number):Promise<SysContractsInstance|null>{
    const infoContract = await SysContracts.findByPk(contract_id)
    return infoContract
  }

  async editContract(contract_id:number,dataContract:ContractType):Promise<boolean>{
    await SysContracts.update(dataContract,{where:{id:contract_id}})
    return true
  }
}
export default new ContractService();