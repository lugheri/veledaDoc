import {Router} from 'express';
import UserController from '../controllers/UserController';
import TeamsController from '../controllers/TeamsController';

export default (routes:Router)=>{
  //Users  
  routes.get(`/totalUsers/:account_id/:status`,UserController.totalUsers)
  routes.get(`/listUsers/:account_id/:status/:pag`,UserController.listUsers)
  routes.post(`/searchUsers`,UserController.searchUsers)
  routes.get(`/getUser/:userId`,UserController.getUser)
  routes.post(`/newUser`,UserController.newUser)
  routes.patch(`/updateUser/:userId`,UserController.updateUser)
  routes.delete(`/deleteUser/:userId`,UserController.deleteUser)
  //Teams
  routes.get(`/totalTeams/:account_id/:status`,TeamsController.totalTeams)
  routes.get(`/listTeams/:account_id/:status/:pag`,TeamsController.listTeams)
  routes.get(`/getTeam/:teamId`,TeamsController.getTeam)
  routes.post(`/newTeam`,TeamsController.newTeam)
  routes.patch(`/updateTeam/:teamId`,TeamsController.updateTeam)
  routes.delete(`/deleteTeam/:teamId`,TeamsController.deleteTeam)
  
}
