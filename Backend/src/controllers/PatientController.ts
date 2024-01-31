import { Request, Response } from "express"
import patientService from "../services/patientService"
import { PatientInformationDTO } from "./Dtos/patient.dto"

class PatientController{

  async newPatient(req:Request,res:Response){
    const dataPatient = PatientInformationDTO.safeParse(req.body)
    if(dataPatient.success){
      try{
        await patientService.newPatient(dataPatient.data)
        res.json({"success":true})
      }catch(err){
        res.json({"error":true,"message":"Ocorreu um erro ao salvar o item","error_info":err})
      }
      return
    }
    res.json({"error":true,"message":dataPatient.error.message})
  }

  async listPatients(req:Request,res:Response){
    const status = parseInt(req.params.status)
    try{
      const list = await patientService.listPatient(status) 
      res.json({"success":true,"response":list})
      return
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao recuperar os itens","error_info":err})
    }
  }

  async infoPatient(req:Request,res:Response){
    const patientId = parseInt(req.params.patientId)
    try{
      const info = await patientService.infoPatient(patientId)
      if(info){
        res.json({"success":true,"response":info})
        return
      }
      res.json({"error":true,"message":"O item solicitado não existe!"})
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao recuperar o item","error_info":err})
    }
  }

  async editPatient(req:Request,res:Response){
    const patientId = parseInt(req.params.patientId)
    const dataPatient = PatientInformationDTO.safeParse(req.body)
    if(dataPatient.success){
      try{
        await patientService.editPatient(patientId,dataPatient.data)
        res.json({"success":true})
      }catch(err){
        res.json({"error":true,"message":"Ocorreu um erro ao alterar o item","error_info":err})
      }
      return
    }
    res.json({"error":true,"message":dataPatient.error.message})
  }

  async deletePatient(req:Request,res:Response){
    const patientId = parseInt(req.params.patientId)
    try{
      await patientService.deletePatient(patientId)
      res.json({"success":true})
    }catch(err){
      res.json({"error":true,"message":"Ocorreu um erro ao remover o item","error_info":err})
    }
  }
  
}
export default new PatientController()