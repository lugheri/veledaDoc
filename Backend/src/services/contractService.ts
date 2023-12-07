import { ContractType } from "../controllers/Dtos/contracts.dto";
import { Contracts, ContractsInstance } from "../models/Contracts";

class ContractService{
  async newContract(dataContract:ContractType):Promise<ContractsInstance>{
    const [newContract,created] = await Contracts.findOrCreate({
      where:{name:dataContract.name},
      defaults:dataContract
    })
    console.log(created)
    return newContract
  }

  async listContracts(page:number,status:number):Promise<ContractsInstance[]>{
    const p = page-1
    const limit = 30
    const offset = limit*p
    const listContracts = await Contracts.findAll({
      where:{status:status},
      order:[['id','DESC']],
      offset:offset,
      limit:limit
    })
    return listContracts
  }

  async infoContract(contract_id:number):Promise<ContractsInstance|null>{
    const infoContract = await Contracts.findByPk(contract_id)
    return infoContract
  }

  async editContract(contract_id:number,dataContract:ContractType):Promise<boolean>{
    await Contracts.update(dataContract,{where:{id:contract_id}})
    return true
  }
}
export default new ContractService();