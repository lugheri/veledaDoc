import { Request, Response } from "express";
import { CheckAccessDTO, ModuleDataDTO, ModuleDataPartialDTO, ModulesDTO, SubModulesDTO } from "./Dtos/modules.dto";
import systemService from "../services/systemService";

class SystemController{
  async newModule(req:Request,res:Response){
    const dataModule = ModuleDataDTO.safeParse(req.body)
    if(!dataModule.success){
      res.json({"error":dataModule.error})
      return
    }
    try{
      const dataNewModule = await systemService.createNewModule(dataModule.data)
      if(dataNewModule){
        res.json({"response":dataNewModule})
        return
      }
      res.json({"error":"Falha ao criar nova equipe!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }  
  }

  async updateModule(req:Request,res:Response){
    const moduleId : number = parseInt(req.params.moduleId)
    const dataModule = ModuleDataPartialDTO.safeParse(req.body)
    if(!dataModule.success){
      res.json({"error": dataModule.error})  
      return
    }
    try{
      const response = await systemService.updateModule(moduleId,dataModule.data)
      if(response){
        res.json({"response":response})
        return
      }
      res.json({"error":"Falha ao alterar módulo!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }  
  }

  async deleteModule(req:Request,res:Response){
    const moduleId = parseInt(req.params.moduleId)
    try{
      const response = await systemService.deleteModule(moduleId)
      res.json({"response": response})  
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})  
    }
  }

  async getModules(req:Request,res:Response){
    const params = ModulesDTO.safeParse(req.params)
    console.log('Params get modules')
    if(!params.success){
      console.log('Params get modules erro',params.error)
      res.json({"error":params.error})
      return
    }
    const modules = await systemService.modulesPolicies(params.data);
    res.json({"success":true,"response":modules})
  }

  async aliasModule(req:Request,res:Response){
    const name = req.params.moduleName
    try{
      const alias = await systemService.aliasModule(name)
      res.json({"response":alias})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }

  }

  async subModules(req: Request,res:Response){
    const params = SubModulesDTO.safeParse(req.params)   
    if(!params.success){
      res.json({"error":params.error})
      return
    }
    const modules = await systemService.subModulesPolicies(params.data);
    res.json({"success": true,"response": modules})  
  }
 
  async getAccess(req:Request,res:Response){
    const params = CheckAccessDTO.safeParse(req.params)     
    if(!params.success){
      res.json({"error":params.error})
      return
    }
    const { account_id,moduleId, levelId } = params.data
    const access = await systemService.checkAccess(account_id,moduleId,levelId);
    res.json({"success": true,"response": access})  
  }
}
export default new SystemController()