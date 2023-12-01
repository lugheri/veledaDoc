import { CredentialDataPartialType, CredentialDataType } from "../controllers/Dtos/security.dto";
import { Credentials, CredentialsInstance } from "../models/Credentials";
import { Levels } from "../models/Levels";

class credentialServices{
  //CREDENTIALS
  async totalCredentials(status:number):Promise<number>{
    const totalLevels = await Credentials.count({
      where:{status:status},
    })
    return totalLevels;
  }

  async createNewCredential(credentialData:CredentialDataType):Promise<boolean|CredentialsInstance>{
    const [ newCredential,created] = await Credentials.findOrCreate({
      where: { name: credentialData.name},      
      defaults:credentialData
    });
    //Setter Redis
    return newCredential.id ? newCredential : false
  }

  async getCredential(credentialId:number):Promise<null|CredentialsInstance>{
    //Redis Implemantation
    const credential = await Credentials.findByPk(credentialId)
    //Redis Updated
    return credential ? credential : null
  }  
  
  async updateCredential(credentialId:number,credentialData:CredentialDataPartialType):Promise<boolean>{
    await Credentials.update(credentialData,{where:{id:credentialId}})
    //Update Redis
    return true
  }

  async listCredentials(status:number,page:number):Promise<CredentialsInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listCredentials = await Credentials.findAll({
      where:{status:status},
      include: {model: Levels, attributes:['name']},
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listCredentials
  }

  async deleteCredential(credentialId:number):Promise<boolean>{
    await Credentials.destroy({where:{id:credentialId}})
    //Update Redis
    return true
  }

}
export default new credentialServices();