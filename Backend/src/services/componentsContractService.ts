import { ComponentContractType } from "../controllers/Dtos/contracts.dto"
import { SysContractsComponents, SysContractsComponentsInstance } from "../models/SysContractsComponents"

class ComponentContractsService{
  async newComponentContract(dataComponentContract:ComponentContractType):Promise<SysContractsComponentsInstance>{
    const newComponentContract = await SysContractsComponents.create(dataComponentContract)
    return newComponentContract
  }

  async listComponents(contract_id:number):Promise<SysContractsComponentsInstance[]>{
    const listComponents = await SysContractsComponents.findAll({
      where:{contract_id:contract_id,status:1},
      order:[['id','ASC']]
    })
    return listComponents
  }

  async infoComponent(component_id:number):Promise<SysContractsComponentsInstance|null>{
    const infoComponent = await SysContractsComponents.findByPk(component_id)
    return infoComponent
  }

  async editComponent(component_id:number,dataComponentContract:ComponentContractType):Promise<boolean>{
    await SysContractsComponents.update(dataComponentContract,{where:{id:component_id}})
    return true
  }
}
export default new ComponentContractsService()