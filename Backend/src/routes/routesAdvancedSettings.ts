import { Router } from "express";
import AdvancedController from "../controllers/AdvancedController";

export default(routes:Router) => {
  //Accounts

  //AvailableTreatments
  routes.post('/newAvailableTreatment',AdvancedController.newAvailableTreatment)
  routes.get('/listAvailableTreatments/:status',AdvancedController.listAvailableTreatments)
  routes.get('/infoAvailableTreatment/:treatmentId',AdvancedController.infoAvailableTreatment)
  routes.put('/editAvailableTreatment/:treatmentId',AdvancedController.editAvailableTreatment)
  routes.delete('/deleteAvailableTreatment/:treatmentId',AdvancedController.deleteAvailableTreatment)

  //Contracts
}