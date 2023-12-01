import { Request, Response } from "express";
import { TeamDataDTO, TeamDataPartialDTO } from "./Dtos/userAccess.dto";
import teamService from "../services/teamService";

class TeamsController{
  async totalTeams(req:Request,res:Response){
    const status:number = parseInt(req.params.status)
    try{
      const totalTeams = await teamService.totalTeams(status)
      res.json({"response":totalTeams})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }

  async listTeams(req:Request,res:Response){
    const status:number = parseInt(req.params.status) 
    const page:number = parseInt(req.params.pag) 
    try{
      const listTeams = await teamService.listTeams(status,page)
      res.json({"response":listTeams})
      return
    }catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }
  
  async getTeam(req:Request,res:Response){
    const teamId:number = parseInt(req.params.teamId) 
    try{
      const team = await teamService.getTeam(teamId)
      res.json({"response":team})
      return
    } catch(err){
      console.log(err)
      res.json({"erros":err})
    }
  }

  async newTeam(req:Request,res:Response){
    const dataTeam = TeamDataDTO.safeParse(req.body)
    if(!dataTeam.success){
      res.json({"error":dataTeam.error})
      return
    }
    try{
      const dataNewTeam = await teamService.createNewTeam(dataTeam.data)
      if(dataNewTeam){
        res.json({"response":dataNewTeam})
        return
      }
      res.json({"error":"Falha ao criar nova equipe!"})
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})
    }    
  }

  async updateTeam(req:Request,res:Response){
    const teamId : number = parseInt(req.params.teamId)
    const dataTeam = TeamDataPartialDTO.safeParse(req.body)
    if(!dataTeam.success){
      res.json({"error": dataTeam.error})  
      return
    }
    try{
      const response = await teamService.updateTeam(teamId,dataTeam.data)
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

  async deleteTeam(req:Request,res:Response){
    const teamId = parseInt(req.params.teamId)
    try{
      const response = await teamService.deleteTeam(teamId)
      res.json({"response": response})  
      return
    }catch(err){
      console.log(err)
      res.json({"error":err})  
    }
  }
}
export default new TeamsController;