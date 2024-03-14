import { Router } from 'express';
import ClinicConsultationsController from '../controllers/ClinicConsultationsController';

export default (routes:Router) => {  
  routes.post('/newState',ClinicConsultationsController.newState)
  routes.get('/infoStates/:state_id',ClinicConsultationsController.infoStates)
  routes.get('/listStates/:account_id',ClinicConsultationsController.listStates)
  routes.put('/editState/:state_id',ClinicConsultationsController.editState)
  routes.delete('/removeState/:state_id',ClinicConsultationsController.removeState)

  routes.post('/addConsultation',ClinicConsultationsController.addConsultation)
  routes.get('/infoConsultation/:consult_id',ClinicConsultationsController.infoConsultation)
  routes.get('/listConsultation/:account_id/:state_id',ClinicConsultationsController.listConsultation)
  routes.put('/editConsultation/:consult_id',ClinicConsultationsController.editConsultation)
  routes.delete('/removeConsultation/:consult_id',ClinicConsultationsController.removeConsultation)
}