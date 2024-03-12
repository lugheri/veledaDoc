import { ModuleDataPartialType, ModuleDataType, ModulesType, SubModulesType } from "../controllers/Dtos/modules.dto";
import { Modules, ModulesInstance } from "../models/Modules";
import { SecurityPolicies } from "../models/SecurityPolicies";

class systemService{
  async createNewModule(moduleData:ModuleDataType):Promise<boolean|ModulesInstance>{
    const [ newModule,created] = await Modules.findOrCreate({
      where: { name: moduleData.name},
      defaults:moduleData
    });
    //Setter Redis
    return newModule.id ? newModule : false
  }

  async updateModule(moduleId:number,moduleData:ModuleDataPartialType):Promise<boolean>{
    await Modules.update(moduleData,{where:{id:moduleId}})
    //Update Redis
    return true
  }

  async deleteModule(moduleId:number):Promise<boolean>{
    await Modules.destroy({where:{id:moduleId}})
    //Update Redis
    return true
  }

  async modulesPolicies(params:ModulesType):Promise<ModulesInstance[]>{
    const modules = await Modules.findAll({
      where: {type: params.type, parent: params.moduleParentId ,status:1},order:[['order','ASC']],
      include: { model: SecurityPolicies, attributes: [], where: { account_id:params.account_id,level_id: params.levelId, active:1},},
    })
    return modules
  }

  async aliasModule(name:string):Promise<string|boolean>{
    const alias = await Modules.findOne({attributes:['alias'],where:{name:name}})
    return alias ? alias.alias : false
  }

  async subModulesPolicies(params:SubModulesType):Promise<ModulesInstance[]>{
    const moduleData = await Modules.findOne({attributes: ['id'], where: {name: params.module}})
    const modules = await Modules.findAll({
      where: {type: params.type, parent: moduleData?.id ,status:1},order:[['order','ASC']],
      include: { model: SecurityPolicies, attributes: [], where: { account_id:params.account_id,level_id: params.levelId, active:1},},
    })
    return modules
  } 

  async checkAccess(account_id:number,moduleId:number,levelId:number):Promise<boolean>{
    const checkAccessPolice = await SecurityPolicies.findOne({attributes:['active'],where:{account_id:account_id,level_id:levelId,module_id:moduleId}})
    return checkAccessPolice ? checkAccessPolice.active === 1 ? true : false : false
  }
}
export default new systemService();