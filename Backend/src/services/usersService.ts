import { SearchUserType, UserDataPartialType, UserDataType } from "../controllers/Dtos/userAccess.dto";
import { Credentials } from "../models/SysCredentials";
import { Teams } from "../models/OffTeams";
import { User, UserInstance } from "../models/SysUsers"
import { Op } from "sequelize"

class usersService{
  async createNewUser(userData:UserDataType):Promise<boolean|UserInstance>{
    const [ newUser,created] = await User.findOrCreate({
      where: { account_id:userData.account_id, name: userData.name},
      defaults:userData
    });
    //Setter Redis
    return newUser.id ? newUser : false
  }

  async totalUsers(account_id:number,status:number):Promise<number>{
    const totalUsers = await User.count({
      where:{account_id:account_id,status:status},
    })
    return totalUsers;
  }

  async getUser(userId:number):Promise<null|UserInstance>{
    //Redis Implementation
    const userData = await User.findByPk(userId)
    //Redis Update
    return userData ? userData : null
  }
  
  async updateUser(userId:number,userData:UserDataPartialType):Promise<boolean>{
    await User.update(userData,{where:{id:userId}})
    //Update Redis
    return true
  }

  async listUsers(account_id:number,status:number,page:number):Promise<UserInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listUsers = await User.findAll({
      where:{account_id:account_id,status:status},
      include: {model: Credentials, attributes:['name']},      
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listUsers
  }

  async searchUser(searchParams:SearchUserType):Promise<UserInstance[]>{
    //Get Redis
    const p = searchParams.page-1
    const limit=30
    const offset=limit*p
    const listUsers = await User.findAll({
      where:{
        [searchParams.params]: {[Op.like]: `%${searchParams.value}%`},
        status:searchParams.status},
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listUsers
  }

  async deleteUser(userId:number):Promise<boolean>{
    await User.destroy({where:{id:userId}})
    //Update Redis
    return true
  }
}
export default new usersService();