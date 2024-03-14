import {Router} from 'express';
import UserController from '../controllers/UserController';

export default (routes:Router)=>{
  //Users  
  routes.get(`/totalUsers/:account_id/:status`,UserController.totalUsers)
  routes.get(`/listUsers/:account_id/:status/:pag`,UserController.listUsers)
  routes.post(`/searchUsers`,UserController.searchUsers)
  routes.get(`/getUser/:userId`,UserController.getUser)
  routes.post(`/newUser`,UserController.newUser)
  routes.patch(`/updateUser/:userId`,UserController.updateUser)
  routes.delete(`/deleteUser/:userId`,UserController.deleteUser)
  
  
}
