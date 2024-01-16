import { ComponentContractType } from "../controllers/Dtos/contracts.dto"
import { ContractsComponents, ContractsComponentsInstance } from "../models/ContractsComponents"

class ComponentContractsService{
  async newComponentContract(dataComponentContract:ComponentContractType):Promise<ContractsComponentsInstance>{
    const newComponentContract = await ContractsComponents.create(dataComponentContract)
    return newComponentContract
  }

  async listComponents(contract_id:number):Promise<ContractsComponentsInstance[]>{
    const listComponents = await ContractsComponents.findAll({
      where:{contract_id:contract_id,status:1},
      order:[['id','ASC']]
    })
    return listComponents
  }

  async infoComponent(component_id:number):Promise<ContractsComponentsInstance|null>{
    const infoComponent = await ContractsComponents.findByPk(component_id)
    return infoComponent
  }

  async editComponent(component_id:number,dataComponentContract:ComponentContractType):Promise<boolean>{
    await ContractsComponents.update(dataComponentContract,{where:{id:component_id}})
    return true
  }
}
export default new ComponentContractsService()