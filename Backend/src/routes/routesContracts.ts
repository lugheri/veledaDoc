import { Router } from 'express';
import ContractsController from '../controllers/ContractsController';


export default (routes:Router) => {
  routes.post('/newContract',ContractsController.newContract)
  routes.get('/listContracts/:page/:status',ContractsController.listContracts)
  routes.get('/infoContract/:contract_id',ContractsController.infoContract)
  routes.patch('/editContract/:contract_id',ContractsController.editContract)
}