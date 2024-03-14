import { ModuleDataPartialType, ModuleDataType, ModulesType, SubModulesType } from "../controllers/Dtos/modules.dto";
import { SysModules, SysModulesInstance } from "../models/SysModules";
import { SysSecurityPolicies } from "../models/SysSecurityPolicies";

class systemService{
  async createNewModule(moduleData:ModuleDataType):Promise<boolean|SysModulesInstance>{
    const [ newModule,created] = await SysModules.findOrCreate({
      where: { name: moduleData.name},
      defaults:moduleData
    });
    //Setter Redis
    return newModule.id ? newModule : false
  }

  async updateModule(moduleId:number,moduleData:ModuleDataPartialType):Promise<boolean>{
    await SysModules.update(moduleData,{where:{id:moduleId}})
    //Update Redis
    return true
  }

  async deleteModule(moduleId:number):Promise<boolean>{
    await SysModules.destroy({where:{id:moduleId}})
    //Update Redis
    return true
  }

  async modulesPolicies(params:ModulesType):Promise<SysModulesInstance[]>{
    const modules = await SysModules.findAll({
      where: {type: params.type, parent: params.moduleParentId ,status:1},order:[['order','ASC']],
      include: { model: SysSecurityPolicies, attributes: [], where: { account_id:params.account_id,level_id: params.levelId, active:1},},
    })
    return modules
  }

  async aliasModule(name:string):Promise<string|boolean>{
    const alias = await SysModules.findOne({attributes:['alias'],where:{name:name}})
    return alias ? alias.alias : false
  }

  async subModulesPolicies(params:SubModulesType):Promise<SysModulesInstance[]>{
    const moduleData = await SysModules.findOne({attributes: ['id'], where: {name: params.module}})
    const modules = await SysModules.findAll({
      where: {type: params.type, parent: moduleData?.id ,status:1},order:[['order','ASC']],
      include: { model: SysSecurityPolicies, attributes: [], where: { account_id:params.account_id,level_id: params.levelId, active:1},},
    })
    return modules
  } 

  async checkAccess(account_id:number,moduleId:number,levelId:number):Promise<boolean>{
    const checkAccessPolice = await SysSecurityPolicies.findOne({attributes:['active'],where:{account_id:account_id,level_id:levelId,module_id:moduleId}})
    return checkAccessPolice ? checkAccessPolice.active === 1 ? true : false : false
  }
}
export default new systemService();