import { Request, Response } from "express";
import availableTreatmentsService from "../services/availableTreatmentsService";
import { AvailableTreatmentsDTO } from "./Dtos/availableTreatment.dto";

class AdvancedSettings{
 //Accounts

  //AvailableTreatments
  async newAvailableTreatment(req:Request,res:Response){
    const dataTreatment = AvailableTreatmentsDTO.safeParse(req.body)
    if(dataTreatment.success){
      try{
        await availableTreatmentsService.newTreatment(dataTreatment.data)
        res.json({"success":true})
      }catch(err){
        res.json({"error":true,"message":"Ocorreu um erro ao salvar o item","error_info":err})
      }
      return
    }
    res.json({"error":true,"message":dataTreatment.error.message}) 
  }
  async listAvailableTreatments(req:Request,res:Response){
    const status = parseInt(req.params.status)
    try{
      const list = await availableTreatmentsService.listTreatment(status)
      res.json({"success":true,"response":list})
      return
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao recuperar os itens","error_info":err})
    }
  }
  async infoAvailableTreatment(req:Request,res:Response){
    const treatmentId = parseInt(req.params.treatmentId)
    try{
      const info = await availableTreatmentsService.infoTreatment(treatmentId)
      if(info){
        res.json({"success":true,"response":info})
        return
      }
      res.json({"error":true,"message":"O item solicitado não existe!"})
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao recuperar o item","error_info":err})
    }
  }
  async editAvailableTreatment(req:Request,res:Response){
    const treatmentId = parseInt(req.params.treatmentId)
    const dataTreatment = AvailableTreatmentsDTO.safeParse(req.body)
    if(dataTreatment.success){
      try{
        await availableTreatmentsService.editTreatment(treatmentId,dataTreatment.data)
        res.json({"success":true})
      }catch(err){
        res.json({"error":true,"message":"Ocorreu um erro ao alterar o item","error_info":err})
      }
      return
    }
    res.json({"error":true,"message":dataTreatment.error.message})
  }
  async deleteAvailableTreatment(req:Request,res:Response){
    const treatmentId = parseInt(req.params.treatmentId)
    try{
      await availableTreatmentsService.deleteTreatment(treatmentId)
      res.json({"success":true})
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao remover o item","error_info":err})
    }
  }

  //Contracts
}
export default new AdvancedSettings();