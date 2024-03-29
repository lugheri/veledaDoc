import md5 from 'md5';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config()

import { SysLogins } from "../models/SysLogins";
import { SysUser,SysUserInstance } from "../models/SysUsers";
import { UserAccessType } from '../controllers/Dtos/userAccess.dto';

class LoginServices {
  async checkUser(accessUser: UserAccessType){
    const userdata = await SysUser.findOne({
      attributes: ['id','account_id','name','password'],
      where: {username: accessUser.username, status:1}
    })
    if(!userdata){
      return false
    }
    if(userdata.password!=md5(accessUser.password)){
      return false
    }
    return userdata
  } 

  async userAuthenticate(action:string,userdata?:SysUserInstance,authHeader?:string){
    if(action=='login'){
      if(userdata){
        const token = jwt.sign({AccountId:userdata.account_id,userId:userdata.id,userName:userdata.mail},process.env.APP_SECRET as string,{expiresIn:'12h'})
        //Check last action login user
        const lastAction = await SysLogins.findOne({attributes: ['action'],
                                                where: {id:userdata.id},
                                                order:[['id','DESC']],
                                                limit:1})
        if(lastAction){
            if (lastAction.action == "login") { //Register last Logout
              await SysLogins.create({ 
                account_id:userdata.account_id,
                date: new Date().toISOString().split('T')[0], 
                hour: new Date().toLocaleTimeString('en-US', { hour12: false }), 
                user_id: userdata.id, 
                action:"logout"
              });
            }
        }
        userdata.logged = 1
        await userdata.save()
        //Register Login
        await SysLogins.create({
          account_id:userdata.account_id,
          date: new Date().toISOString().split('T')[0],
          hour: new Date().toLocaleTimeString('en-US', { hour12: false }), 
          user_id: userdata.id, 
          action:action
        });
        return token
      }
      return null
    }else{
      if(!authHeader){
        console.log("No auth header")
        return false
      }
      interface TokenPayload {
        userId: string;
      }
      const { userId } = jwt.verify(authHeader, process.env.APP_SECRET as string) as TokenPayload;
      if(!userId){
        console.log("User Id is not founded")
        return false
      }
      const userdata = await SysUser.findByPk(userId)
      if(userdata){
        console.log("User has been logged out successfully")
        userdata.logged = 0
        await userdata.save()
        await SysLogins.create({
          account_id:userdata.account_id,
          date: new Date().toISOString().split('T')[0],
          hour: new Date().toLocaleTimeString('en-US', { hour12: false }),
          user_id: userdata.id,
          action:action
        });
        return null
      }
      console.log("User Id is not valid")
      return null
    }
  }
}
export default new LoginServices();