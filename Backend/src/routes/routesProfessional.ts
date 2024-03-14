import { Router } from "express";
import ProfessionalController from "../controllers/ProfessionalController";

export default (routes:Router) => {
  routes.post('/newProfessional',ProfessionalController.newProfessional)
  routes.get('/listProfessionals/:account_id/:status',ProfessionalController.listProfessionals)
  routes.get('/infoProfessional/:professionalId',ProfessionalController.infoProfessional)
  routes.put('/editProfessional/:professionalId',ProfessionalController.editProfessional)
  routes.delete('/deleteProfessional/:professionalId',ProfessionalController.deleteProfessional)
}