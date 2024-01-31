import { Request, Response } from "express"
import { ProfessionalDTO } from "./Dtos/professional.dto"
import professionalService from "../services/professionalService"

class ProfessionalController{

  async newProfessional(req:Request,res:Response){
    const dataProfessional = ProfessionalDTO.safeParse(req.body)
    if(dataProfessional.success){
      try{
        await professionalService.newProfessional(dataProfessional.data)
        res.json({"success":true})
      }catch(err){
        res.json({"error":true,"message":"Ocorreu um erro ao salvar o item","error_info":err})
      }
      return
    }
    res.json({"error":true,"message":dataProfessional.error.message})
  }

  async listProfessionals(req:Request,res:Response){
    const status = parseInt(req.params.status)
    try{
      const list = await professionalService.listProfessional(status) 
      res.json({"success":true,"response":list})
      return
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao recuperar os itens","error_info":err})
    }
  }

  async infoProfessional(req:Request,res:Response){
    const professionalId = parseInt(req.params.professionalId)
    try{
      const info = await professionalService.infoProfessional(professionalId)
      if(info){
        res.json({"success":true,"response":info})
        return
      }
      res.json({"error":true,"message":"O item solicitado não existe!"})
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao recuperar o item","error_info":err})
    }
  }

  async editProfessional(req:Request,res:Response){
    const professionalId = parseInt(req.params.professionalId)
    const dataProfessional = ProfessionalDTO.safeParse(req.body)
    if(dataProfessional.success){
      try{
        await professionalService.editProfessional(professionalId,dataProfessional.data)
        res.json({"success":true})
      }catch(err){
        res.json({"error":true,"message":"Ocorreu um erro ao alterar o item","error_info":err})
      }
      return
    }
    res.json({"error":true,"message":dataProfessional.error.message})
  }

  async deleteProfessional(req:Request,res:Response){
    const professionalId = parseInt(req.params.professionalId)
    try{
      await professionalService.deleteProfessional(professionalId)
      res.json({"success":true})
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao remover o item","error_info":err})
    }
  }
  
}
export default new ProfessionalController()