import { Request, Response } from "express"
import { ProcedureDTO } from "./Dtos/procedure.dto"
import procedureService from "../services/procedureService"

class ProcedureController{

  async newProcedure(req:Request,res:Response){
    const dataProcedure = ProcedureDTO.safeParse(req.body)
    if(dataProcedure.success){
      try{
        await procedureService.newProcedure(dataProcedure.data)
        res.json({"success":true})
      }catch(err){
        res.json({"error":true,"message":"Ocorreu um erro ao salvar o item","error_info":err})
      }
      return
    }
    res.json({"error":true,"message":dataProcedure.error.message})
  }

  async listProcedures(req:Request,res:Response){
    const status = parseInt(req.params.status)
    try{
      const list = await procedureService.listProcedures(status) 
      res.json({"success":true,"response":list})
      return
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao recuperar os itens","error_info":err})
    }
  }

  async infoProcedure(req:Request,res:Response){
    const procedureId = parseInt(req.params.procedureId)
    try{
      const info = await procedureService.infoProcedure(procedureId)
      if(info){
        res.json({"success":true,"response":info})
        return
      }
      res.json({"error":true,"message":"O item solicitado não existe!"})
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao recuperar o item","error_info":err})
    }
  }

  async editProcedure(req:Request,res:Response){
    const procedureId = parseInt(req.params.procedureId)
    const dataProcedure = ProcedureDTO.safeParse(req.body)
    if(dataProcedure.success){
      try{
        await procedureService.editProcedure(procedureId,dataProcedure.data)
        res.json({"success":true})
      }catch(err){
        res.json({"error":true,"message":"Ocorreu um erro ao alterar o item","error_info":err})
      }
      return
    }
    res.json({"error":true,"message":dataProcedure.error.message})
  }

  async deleteProcedure(req:Request,res:Response){
    const procedureId = parseInt(req.params.procedureId)
    try{
      await procedureService.deleteProcedure(procedureId)
      res.json({"success":true})
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao remover o item","error_info":err})
    }
  }
  
}
export default new ProcedureController()