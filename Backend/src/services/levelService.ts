import { LevelDataPartialType, LevelDataType } from "../controllers/Dtos/security.dto";
import { SysLevels, SysLevelsInstance } from "../models/SysLevels";

class levelServices{
  //CREDENTIALS
  async createNewLevel(levelData:LevelDataType):Promise<boolean|SysLevelsInstance>{
    const [ newLevel,created] = await SysLevels.findOrCreate({
      where: { account_id:levelData.account_id, name: levelData.name},
      defaults:levelData
    });
    //Setter Redis
    return newLevel.id ? newLevel : false
  }

  async getLevel(levelId:number):Promise<null|SysLevelsInstance>{
    //Redis Implemantation
    const level = await SysLevels.findByPk(levelId)
    //Redis Updated
    return level ? level : null
  }  
  
  async updateLevel(levelId:number,levelData:LevelDataPartialType):Promise<boolean>{
    await SysLevels.update(levelData,{where:{id:levelId}})
    //Update Redis
    return true
  }

  async totalLevels(account_id:number,status:number):Promise<number>{
    const totalLevels = await SysLevels.count({
      where:{account_id:account_id,status:status},
    })
    return totalLevels;
  }

  async listLevels(account_id:number,status:number,page:number):Promise<SysLevelsInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listLevels = await SysLevels.findAll({
      where:{account_id:account_id,status:status},
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listLevels
  }

  async deleteLevel(levelId:number):Promise<boolean>{
    await SysLevels.destroy({where:{id:levelId}})
    //Update Redis
    return true
  }

}
export default new levelServices();