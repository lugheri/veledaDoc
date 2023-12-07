import { Request, Response } from "express";
import { ContractDTO } from "./Dtos/contracts.dto";
import contractService from "../services/contractService";

class ContractsController{
  async newContract(req:Request,res:Response){
    const dataNewContract = ContractDTO.safeParse(req.body)
    if(!dataNewContract.success){
      const jsonError = JSON.parse(dataNewContract.error.message)
      const errorMessage =`${jsonError[0].message} on field(s): ${jsonError[0].path}`
      res.json({error:true,message:errorMessage})
      return
    }
    try{
      const newContract = await contractService.newContract(dataNewContract.data)
      res.json({sucess:true,response:newContract})
    }catch(err){
      res.json({error:true,message:'Ocorreu um erro ao processar esta requisição',info:err})
    }

  }
  async listContracts(req:Request,res:Response){
    const page = parseInt(req.params.page);
    const status  = parseInt(req.params.page);
    try{
      const listContracts = await contractService.listContracts(page,status)
      res.json({success:true,response:listContracts})
    }catch(err){
      res.json({error:true,message:'Ocorreu um erro ao processar esta requisição',info:err})
    }
  }
  async infoContract(req:Request,res:Response){
    const contract_id = parseInt(req.params.contract_id)
    try{
      const infoContract = await contractService.infoContract(contract_id)
      res.json({success:true,response:infoContract})
    }catch(err){
      res.json({error:true,message:'Ocorreu um erro ao processar esta requisição',info:err})
    }
  }
  async editContract(req:Request,res:Response){
    const contract_id = parseInt(req.params.contract_id)
    const dataContract = ContractDTO.safeParse(req.body)
    if(!dataContract.success){
      const jsonError = JSON.parse(dataContract.error.message)
      const errorMessage =`${jsonError[0].message} on field(s): ${jsonError[0].path}`
      res.json({error:true,message:errorMessage})
      return
    }
    try{
      await contractService.editContract(contract_id,dataContract.data)
      res.json({success:true})
    }catch(err){
      res.json({error:true,message:'Ocorreu um erro ao processar esta requisição',info:err})
    }
  }  
}
export default new ContractsController();