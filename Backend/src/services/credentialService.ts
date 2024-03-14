import { CredentialDataPartialType, CredentialDataType } from "../controllers/Dtos/security.dto";
import { SysCredentials, SysCredentialsInstance } from "../models/SysCredentials";
import { SysLevels } from "../models/SysLevels";

class credentialServices{
  //CREDENTIALS
  async totalCredentials(account_id:number,status:number):Promise<number>{
    const totalLevels = await SysCredentials.count({
      where:{account_id:account_id,status:status},
    })
    return totalLevels;
  }

  async createNewCredential(credentialData:CredentialDataType):Promise<boolean|SysCredentialsInstance>{
    const [ newCredential,created] = await SysCredentials.findOrCreate({
      where: { account_id: credentialData.account_id, name: credentialData.name},      
      defaults:credentialData
    });
    //Setter Redis
    return newCredential.id ? newCredential : false
  }

  async getCredential(credentialId:number):Promise<null|SysCredentialsInstance>{
    //Redis Implemantation
    const credential = await SysCredentials.findByPk(credentialId)
    //Redis Updated
    return credential ? credential : null
  }  
  
  async updateCredential(credentialId:number,credentialData:CredentialDataPartialType):Promise<boolean>{
    await SysCredentials.update(credentialData,{where:{id:credentialId}})
    //Update Redis
    return true
  }

  async listCredentials(account_id:number,status:number,page:number):Promise<SysCredentialsInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listCredentials = await SysCredentials.findAll({
      where:{account_id:account_id,status:status},
      include: {model: SysLevels, attributes:['name']},
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listCredentials
  }

  async deleteCredential(credentialId:number):Promise<boolean>{
    await SysCredentials.destroy({where:{id:credentialId}})
    //Update Redis
    return true
  }

}
export default new credentialServices();