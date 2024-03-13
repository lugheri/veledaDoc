import { Router } from "express";
import PatientController from "../controllers/PatientController";

export default (routes:Router) => {
  routes.post('/newPatient',PatientController.newPatient)
  routes.get('/listPatients/:status',PatientController.listPatients)
  routes.get('/searchPatients/:params',PatientController.searchPatients)
  routes.get('/infoPatient/:patientId',PatientController.infoPatient)
  routes.put('/editPatient/:patientId',PatientController.editPatient)
  routes.delete('/deletePatient/:patientId',PatientController.deletePatient)
}