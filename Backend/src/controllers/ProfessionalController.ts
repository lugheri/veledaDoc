import { Request, Response } from "express"
import { ProfessionalDTO } from "./Dtos/professional.dto"
import professionalService from "../services/professionalService"

class ProfessionalController{
  async newProfessional(req:Request,res:Response){
    const dataProfessional = ProfessionalDTO.safeParse(req.body)
    if(!dataProfessional.success){
      res.status(400).json({
        "error":true,
        "message":dataProfessional.error.message
      })
      return
    }
    try{
      await professionalService.newProfessional(dataProfessional.data)
      res.json({"success":true})
    }catch(err:any){
      console.error("Erro ao criar profissional:", err);
      res.status(500).json({
        "error":true,
        "message":`Ocorreu um erro interno no servidor. (${err.message})`
      })
    }
  }

  async listProfessionals(req:Request,res:Response){
    const account_id = parseInt(req.params.account_id)
    const status = parseInt(req.params.status)
    try{
      const list = await professionalService.listProfessional(account_id,status) 
      res.json({"success":true,"response":list})
      return
    }catch(err: any){
      console.error("Erro ao listar os profissionais:", err);
      res.status(500).json({
        "error":true,
        "message":`Ocorreu um erro interno no servidor. (${err.message})`
      })
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
    }catch(err: any){
      console.error("Erro ao exibir dados do profissionais:", err);
      res.status(500).json({
        "error":true,
        "message":`Ocorreu um erro interno no servidor. (${err.message})`
      })
    }
  }

  async editProfessional(req:Request,res:Response){
    const professionalId = parseInt(req.params.professionalId)
    const dataProfessional = ProfessionalDTO.safeParse(req.body)
    if(!dataProfessional.success){
      res.status(400).json({
        "error":true,
        "message":dataProfessional.error.message
      })
      return
    }
    try{
      await professionalService.editProfessional(professionalId,dataProfessional.data)
      res.json({"success":true})
    }catch(err:any){
      console.error("Erro ao editar profissional:", err);
      res.status(500).json({
        "error":true,
        "message":`Ocorreu um erro interno no servidor. (${err.message})`
      })
    }
  }

  async deleteProfessional(req:Request,res:Response){
    const professionalId = parseInt(req.params.professionalId)
    try{
      await professionalService.deleteProfessional(professionalId)
      res.json({"success":true})
    }catch(err:any){
      console.error("Erro ao remover profissional:", err);
      res.status(500).json({
        "error":true,
        "message":`Ocorreu um erro interno no servidor. (${err.message})`
      })
    }
  }
  
}
export default new ProfessionalController()