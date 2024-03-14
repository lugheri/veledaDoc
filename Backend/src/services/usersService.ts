import { SearchUserType, UserDataPartialType, UserDataType } from "../controllers/Dtos/userAccess.dto";
import { SysCredentials } from "../models/SysCredentials";
import { SysUser, SysUserInstance } from "../models/SysUsers"
import { Op } from "sequelize"

class usersService{
  async createNewUser(userData:UserDataType):Promise<boolean|SysUserInstance>{
    const [ newUser,created] = await SysUser.findOrCreate({
      where: { account_id:userData.account_id, name: userData.name},
      defaults:userData
    });
    //Setter Redis
    return newUser.id ? newUser : false
  }

  async totalUsers(account_id:number,status:number):Promise<number>{
    const totalUsers = await SysUser.count({
      where:{account_id:account_id,status:status},
    })
    return totalUsers;
  }

  async getUser(userId:number):Promise<null|SysUserInstance>{
    //Redis Implementation
    const userData = await SysUser.findByPk(userId)
    //Redis Update
    return userData ? userData : null
  }
  
  async updateUser(userId:number,userData:UserDataPartialType):Promise<boolean>{
    await SysUser.update(userData,{where:{id:userId}})
    //Update Redis
    return true
  }

  async listUsers(account_id:number,status:number,page:number):Promise<SysUserInstance[]>{
    //Get Redis
    const p = page-1
    const limit=30
    const offset=limit*p
    const listUsers = await SysUser.findAll({
      where:{account_id:account_id,status:status},
      include: {model: SysCredentials, attributes:['name']},      
      offset:offset,
      limit:limit
    })
    //Update Redis
    return listUsers
  }

  async searchUser(searchParams:SearchUserType):Promise<SysUserInstance[]>{
    //Get Redis
    const p = searchParams.page-1
    const limit=30
    const offset=limit*p
    const listUsers = await SysUser.findAll({
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
    await SysUser.destroy({where:{id:userId}})
    //Update Redis
    return true
  }
}
export default new usersService();