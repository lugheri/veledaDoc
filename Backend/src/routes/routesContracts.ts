import { Router } from 'express';
import ContractsController from '../controllers/ContractsController';


export default (routes:Router) => {
  //Contracts
  routes.post('/newContract',ContractsController.newContract)
  routes.get('/listContracts/:page/:status',ContractsController.listContracts)
  routes.get('/infoContract/:contract_id',ContractsController.infoContract)
  routes.patch('/editContract/:contract_id',ContractsController.editContract)
  //Contract Components
  routes.post('/newComponent',ContractsController.newComponent)
  routes.get('/listComponents/:contract_id',ContractsController.listComponents)
  routes.get('/infoComponent/:component_id',ContractsController.infoComponent)
  routes.patch('/editComponent/:component_id',ContractsController.editComponent)
}