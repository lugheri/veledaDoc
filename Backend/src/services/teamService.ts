import { TeamDataPartialType, TeamDataType } from "../controllers/Dtos/userAccess.dto";
import { Teams, TeamsInstance } from "../models/OffTeams";

class teamService{
  async createNewTeam(teamData:TeamDataType):Promise<boolean|TeamsInstance>{
    const [ newTeam,created] = await Teams.findOrCreate({
      where: { account_id:teamData.account_id, name: teamData.name},
      defaults:teamData
    });
    //Setter Redis
    return newTeam.id ? newTeam : false
  }

  async totalTeams(account_id:number,status:number):Promise<number>{
    const totalTeams = await Teams.count({
      where:{account_id:account_id,status:status},
    })
    return totalTeams;
  }

  async getTeam(teamId:number):Promise<boolean|TeamsInstance>{
    //Get Redis
    const Team = await Teams.findByPk(teamId)
    //Update Redis
    return Team ? Team : false
  }  
  
  async updateTeam(teamId:number,teamData:TeamDataPartialType):Promise<boolean>{
    await Teams.update(teamData,{where:{id:teamId}})
    //Update Redis
    return true
  }

  async listTeams(account_id:number,status:number,page:number):Promise<TeamsInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listTeams = await Teams.findAll({
      where:{account_id:account_id,status:status},
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listTeams
  }

  async deleteTeam(teamId:number):Promise<boolean>{
    await Teams.destroy({where:{id:teamId}})
    //Update Redis
    return true
  }
}
export default new teamService();
