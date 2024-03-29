import { PolicyDataPartialType, PolicyDataType } from "../controllers/Dtos/security.dto";
import { SysSecurityPolicies, SysSecurityPoliciesInstance } from "../models/SysSecurityPolicies";

class policyService{
  async createNewPolicy(policyData:PolicyDataType):Promise<boolean|SysSecurityPoliciesInstance>{
    const [ newPolicy,created] = await SysSecurityPolicies.findOrCreate({
      where: { account_id:policyData.account_id, level_id: policyData.level_id, module_id: policyData.module_id, parent_module_id: policyData.parent_module_id},
      defaults:policyData
    });
    //Setter Redis
    return newPolicy.id ? newPolicy : false
  }

  async getPolicy(policyId:number):Promise<boolean|SysSecurityPoliciesInstance>{
    //Get Redis
    const Policy = await SysSecurityPolicies.findByPk(policyId)
    //Update Redis
    return Policy ? Policy : false
  }  
  
  async updatePolicy(policyId:number,policyData:PolicyDataPartialType):Promise<boolean>{
    await SysSecurityPolicies.update(policyData,{where:{id:policyId}})
    //Update Redis
    return true
  }

  async listPolicies(account_id:number,status:number,page:number):Promise<SysSecurityPoliciesInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listPolicies = await SysSecurityPolicies.findAll({
      where:{account_id:account_id,status:status},
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listPolicies
  }

  async deletePolicy(policyId:number):Promise<boolean>{
    await SysSecurityPolicies.destroy({where:{id:policyId}})
    //Update Redis
    return true
  }
}
export default new policyService();
