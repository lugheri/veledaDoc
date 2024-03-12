import { Request, Response } from "express"
import levelService from "../services/levelService"
import { LevelDataDTO, LevelDataPartialDTO } from "./Dtos/security.dto"

class LevelsController{
  async totalLevels(req:Request,res:Response){
    const account_id:number = parseInt(req.params.account_id) 
    const status:number = parseInt(req.params.status)
    try{
      const totalLevels = await levelService.totalLevels(account_id,status)
      res.json({"response":totalLevels})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }

  async listLevels(req:Request,res:Response){
    const account_id:number = parseInt(req.params.account_id) 
    const status:number = parseInt(req.params.status) 
    const page:number = parseInt(req.params.pag) 
    try{
      const listLevels = await levelService.listLevels(account_id,status,page)
      res.json({"response":listLevels})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }
  
  async getLevel(req:Request,res:Response){
    const levelId : number = parseInt(req.params.levelId);
    try{
      const level = await levelService.getLevel(levelId)
      res.json({"success":true,"response":level})
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }
  }

  async newLevel(req:Request,res:Response){
    const dataLevel = LevelDataDTO.safeParse(req.body)
    if(!dataLevel.success){
      res.json({"error":dataLevel.error})
      return
    }
    try{
      const dataNewLevel = await levelService.createNewLevel(dataLevel.data)
      if(dataNewLevel){
        res.json({"response":dataNewLevel})
        return
      }
      res.json({"error":"Falha ao criar novo nível!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async updateLevel(req:Request,res:Response){
    const levelId : number = parseInt(req.params.levelId)
    const dataLevel = LevelDataPartialDTO.safeParse(req.body)
    if(!dataLevel.success){
      res.json({"error": dataLevel.error})  
      return
    }
    try{
      const response = await levelService.updateLevel(levelId,dataLevel.data)
      if(response){
        res.json({"response":response})
        return
      }
      res.json({"error":"Falha ao editar novo nível!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async deleteLevel(req:Request,res:Response){
    const levelId = parseInt(req.params.levelId)
    try{
      const response = await levelService.deleteLevel(levelId)
      res.json({"response": response})  
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})  
    }
  }
}
export default new LevelsController();