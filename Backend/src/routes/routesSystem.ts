import { Router } from 'express';
import SystemController from '../controllers/SystemController';

export default (routes:Router)=>{
  //Modules CRUD
  routes.post(`/newModule`,SystemController.newModule)
  routes.patch(`/updateModule/:moduleId`,SystemController.updateModule)
  routes.delete(`/deleteModule/:moduleId`,SystemController.deleteModule)

  //Access Control
  routes.get("/modules/:type/:moduleParentId/:levelId",SystemController.getModules)
  routes.get("/aliasModule/:moduleName",SystemController.aliasModule)
  routes.get("/subModules/:type/:module/:levelId",SystemController.subModules)
  routes.get("/checkAccess/:moduleId/:levelId",SystemController.getAccess);
}