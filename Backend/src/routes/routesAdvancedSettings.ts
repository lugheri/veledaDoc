import { Router } from "express";
import AdvancedSettings from "../controllers/AdvancedSettings";

export default(routes:Router) => {
  //Accounts

  //AvailableTreatments
  routes.post('/newAvailableTreatment',AdvancedSettings.newAvailableTreatment)
  routes.get('/listAvailableTreatments/:status',AdvancedSettings.listAvailableTreatments)
  routes.get('/infoAvailableTreatment/:treatmentId',AdvancedSettings.infoAvailableTreatment)
  routes.put('/editAvailableTreatment/:treatmentId',AdvancedSettings.editAvailableTreatment)
  routes.delete('/deleteAvailableTreatment/:treatmentId',AdvancedSettings.deleteAvailableTreatment)

  //Contracts
}