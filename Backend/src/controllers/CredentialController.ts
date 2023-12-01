import { Request, Response } from "express";
import securityService from "../services/credentialService";
import credentialService from "../services/credentialService";
import { CredentialDataDTO, CredentialDataPartialDTO } from "./Dtos/security.dto";

class CredentialController{  
  async totalCredentials(req:Request,res:Response){
    const status:number = parseInt(req.params.status)
    try{
      const totalCredentials = await credentialService.totalCredentials(status)
      res.json({"response":totalCredentials})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }

  async listCredentials(req:Request,res:Response){
    const status:number = parseInt(req.params.status) 
    const page:number = parseInt(req.params.pag) 
    try{
      const listCredentials = await credentialService.listCredentials(status,page)
      res.json({"response":listCredentials})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }
  
  async getCredential(req:Request,res:Response){
    const credentialId : number = parseInt(req.params.credentialId);
    try{
      const credential = await credentialService.getCredential(credentialId)
      res.json({"success":true,"response":credential})
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }
  }

  async newCredential(req:Request,res:Response){
    const dataCredential = CredentialDataDTO.safeParse(req.body)
    if(!dataCredential.success){
      res.json({"error":dataCredential.error})
      return
    }
    try{
      const dataNewCredential = await credentialService.createNewCredential(dataCredential.data)
      if(dataNewCredential){
        res.json({"response":dataNewCredential})
        return
      }
      res.json({"error":"Falha ao criar nova equipe!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async updateCredential(req:Request,res:Response){
    const credentialId : number = parseInt(req.params.credentialId)
    const dataCredential = CredentialDataPartialDTO.safeParse(req.body)
    
    if(!dataCredential.success){
      res.json({"error": dataCredential.error})  
      return
    }
    try{
      const response = await credentialService.updateCredential(credentialId,dataCredential.data)
      if(response){
        res.json({"response":response})
        return
      }
      res.json({"error":"Falha ao atualizar credencial!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async deleteCredential(req:Request,res:Response){
    const credentialId = parseInt(req.params.credentialId)
    try{
      const response = await credentialService.deleteCredential(credentialId)
      res.json({"response": response})  
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})  
    }
  }
}
export default new CredentialController();