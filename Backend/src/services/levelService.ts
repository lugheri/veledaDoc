import { LevelDataPartialType, LevelDataType } from "../controllers/Dtos/security.dto";
import { Levels, LevelsInstance } from "../models/SysLevels";

class levelServices{
  //CREDENTIALS
  async createNewLevel(levelData:LevelDataType):Promise<boolean|LevelsInstance>{
    const [ newLevel,created] = await Levels.findOrCreate({
      where: { account_id:levelData.account_id, name: levelData.name},
      defaults:levelData
    });
    //Setter Redis
    return newLevel.id ? newLevel : false
  }

  async getLevel(levelId:number):Promise<null|LevelsInstance>{
    //Redis Implemantation
    const level = await Levels.findByPk(levelId)
    //Redis Updated
    return level ? level : null
  }  
  
  async updateLevel(levelId:number,levelData:LevelDataPartialType):Promise<boolean>{
    await Levels.update(levelData,{where:{id:levelId}})
    //Update Redis
    return true
  }

  async totalLevels(account_id:number,status:number):Promise<number>{
    const totalLevels = await Levels.count({
      where:{account_id:account_id,status:status},
    })
    return totalLevels;
  }

  async listLevels(account_id:number,status:number,page:number):Promise<LevelsInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listLevels = await Levels.findAll({
      where:{account_id:account_id,status:status},
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listLevels
  }

  async deleteLevel(levelId:number):Promise<boolean>{
    await Levels.destroy({where:{id:levelId}})
    //Update Redis
    return true
  }

}
export default new levelServices();