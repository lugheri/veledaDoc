import { PolicyDataPartialType, PolicyDataType } from "../controllers/Dtos/security.dto";
import { SecurityPolicies, SecurityPoliciesInstance } from "../models/SecurityPolicies";

class policyService{
  async createNewPolicy(policyData:PolicyDataType):Promise<boolean|SecurityPoliciesInstance>{
    const [ newPolicy,created] = await SecurityPolicies.findOrCreate({
      where: { account_id:policyData.account_id, level_id: policyData.level_id, module_id: policyData.module_id, parent_module_id: policyData.parent_module_id},
      defaults:policyData
    });
    //Setter Redis
    return newPolicy.id ? newPolicy : false
  }

  async getPolicy(policyId:number):Promise<boolean|SecurityPoliciesInstance>{
    //Get Redis
    const Policy = await SecurityPolicies.findByPk(policyId)
    //Update Redis
    return Policy ? Policy : false
  }  
  
  async updatePolicy(policyId:number,policyData:PolicyDataPartialType):Promise<boolean>{
    await SecurityPolicies.update(policyData,{where:{id:policyId}})
    //Update Redis
    return true
  }

  async listPolicies(account_id:number,status:number,page:number):Promise<SecurityPoliciesInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listPolicies = await SecurityPolicies.findAll({
      where:{account_id:account_id,status:status},
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listPolicies
  }

  async deletePolicy(policyId:number):Promise<boolean>{
    await SecurityPolicies.destroy({where:{id:policyId}})
    //Update Redis
    return true
  }
}
export default new policyService();
