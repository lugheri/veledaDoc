import { Request, Response } from "express";
import { ComponentContractDTO, ContractDTO } from "./Dtos/contracts.dto";
import contractService from "../services/contractService";
import componentsContractService from "../services/componentsContractService";

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
      res.json({success:true,response:newContract})
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
  //Components
  async newComponent(req:Request,res:Response){
    const dataNewComponent = ComponentContractDTO.safeParse(req.body)
    if(!dataNewComponent.success){
      const jsonError = JSON.parse(dataNewComponent.error.message)
      const errorMessage =`${jsonError[0].message} on field(s): ${jsonError[0].path}`
      res.json({error:true,message:errorMessage})
      return
    }
    try{
      const newComponent = await componentsContractService.newComponentContract(dataNewComponent.data)
      res.json({success:true,response:newComponent.id})
    }catch(err){
      res.json({error:true,message:'Ocorreu um erro ao processar esta requisição',info:err})
    }
  }
  async listComponents(req:Request,res:Response){
    const contract_id = parseInt(req.params.contract_id);
    try{
      const listComponents = await componentsContractService.listComponents(contract_id)
      res.json({success:true,response:listComponents})
    }catch(err){
      res.json({error:true,message:'Ocorreu um erro ao processar esta requisição',info:err})
    }
  }
  async infoComponent(req:Request,res:Response){
    const component_id = parseInt(req.params.component_id)
    try{
      const infoComponent = await componentsContractService.infoComponent(component_id)
      res.json({success:true,response:infoComponent})
    }catch(err){
      res.json({error:true,message:'Ocorreu um erro ao processar esta requisição',info:err})
    }
  }
  async editComponent(req:Request,res:Response){
    const component_id = parseInt(req.params.component_id)
    const dataComponent = ComponentContractDTO.safeParse(req.body)
    if(!dataComponent.success){
      const jsonError = JSON.parse(dataComponent.error.message)
      const errorMessage =`${jsonError[0].message} on field(s): ${jsonError[0].path}`
      res.json({error:true,message:errorMessage})
      return
    }
    try{
      await componentsContractService.editComponent(component_id,dataComponent.data)
      res.json({success:true})
    }catch(err){
      res.json({error:true,message:'Ocorreu um erro ao processar esta requisição',info:err})
    }
  }  
}
export default new ContractsController();