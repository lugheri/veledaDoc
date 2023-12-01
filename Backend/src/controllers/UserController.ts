import { Request, Response } from "express";
import usersService from "../services/usersService";
import { SearchUserDTO, UserDataDTO, UserDataPartialDTO } from "./Dtos/userAccess.dto";

class UserController{
  async totalUsers(req:Request,res:Response){
    const status:number = parseInt(req.params.status)
    try{
      const totalUsers = await usersService.totalUsers(status)
      res.json({"response":totalUsers})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }

  async listUsers(req:Request,res:Response){
    const status:number = parseInt(req.params.status) 
    const page:number = parseInt(req.params.pag) 
    try{
      const listUsers = await usersService.listUsers(status,page)
      res.json({"response":listUsers})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }

  async searchUsers(req:Request,res:Response){
    const searchParams = SearchUserDTO.safeParse(req.body)
    if(!searchParams.success){
      res.json({"error":searchParams.error})
      return
    }
    try{
      const findUsers = await usersService.searchUser(searchParams.data)
      res.json({"response":findUsers})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }
  
  async getUser(req:Request,res:Response){
    const userId : number = parseInt(req.params.userId)
    try{
      const userData = await usersService.getUser(userId);
      res.json({"success":true,"response":userData})
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }
  }

  async newUser(req:Request,res:Response){
    const dataUser = UserDataDTO.safeParse(req.body)
    if(!dataUser.success){
      res.json({"error":dataUser.error})
      return
    }
    try{
      const dataNewUser = await usersService.createNewUser(dataUser.data)
      if(dataNewUser){
        res.json({"response":dataNewUser})
        return
      }
      res.json({"error":"Falha ao criar usuário!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async updateUser(req:Request,res:Response){
    const userId : number = parseInt(req.params.userId)
    const dataUser = UserDataPartialDTO.safeParse(req.body)
    if(!dataUser.success){
      res.json({"error": dataUser.error})  
      return
    }
    try{
      const response = await usersService.updateUser(userId,dataUser.data)
      if(response){
        res.json({"response":response})
        return
      }
      res.json({"error":"Falha ao alterar!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async deleteUser(req:Request,res:Response){
    const userId = parseInt(req.params.userId)
    try{
      const response = await usersService.deleteUser(userId)
      res.json({"response": response})  
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})  
    }
  }

}
export default new UserController();