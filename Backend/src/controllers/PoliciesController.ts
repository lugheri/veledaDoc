import { Request, Response } from "express";
import policyService from "../services/policyService";
import { PolicyDataDTO, PolicyDataPartialDTO } from "./Dtos/security.dto";

class PoliciesController{
  async listPolicies(req:Request,res:Response){
    const account_id:number = parseInt(req.params.account_id) 
    const status:number = parseInt(req.params.status) 
    const page:number = parseInt(req.params.pag) 
    try{
      const listPolicies = await policyService.listPolicies(account_id,status,page)
      res.json({"response":listPolicies})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }
  
  async getPolicy(req:Request,res:Response){
    const policyId:number = parseInt(req.params.policyId) 
    try{
      const policy = await policyService.getPolicy(policyId)
      res.json({"response":policy})
      return
    } catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }

  async newPolicy(req:Request,res:Response){
    const dataPolicy = PolicyDataDTO.safeParse(req.body)
    if(!dataPolicy.success){
      res.json({"error":dataPolicy.error})
      return
    }
    try{
      const dataNewPolicy = await policyService.createNewPolicy(dataPolicy.data)
      if(dataNewPolicy){
        res.json({"response":dataNewPolicy})
        return
      }
      res.json({"error":"Falha ao criar nova policy!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async updatePolicy(req:Request,res:Response){
    const policyId : number = parseInt(req.params.policyId)
    const dataPolicy = PolicyDataPartialDTO.safeParse(req.body)
    if(!dataPolicy.success){
      res.json({"error": dataPolicy.error})  
      return
    }
    try{
      const response = await policyService.updatePolicy(policyId,dataPolicy.data)
      if(response){
        res.json({"response":response})
        return
      }
      res.json({"error":"Falha ao criar nova equipe!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async deletePolicy(req:Request,res:Response){
    const policyId = parseInt(req.params.policyId)
    try{
      const response = await policyService.deletePolicy(policyId)
      res.json({"response": response})  
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})  
    }
  }
}
export default new PoliciesController;