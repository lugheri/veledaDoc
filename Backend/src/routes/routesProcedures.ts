import { Router } from "express";
import ProcedureController from "../controllers/ProcedureController";

export default (routes:Router) => {
  routes.post('/newProcedure',ProcedureController.newProcedure)
  routes.get('/listProcedures/:status',ProcedureController.listProcedures)
  routes.get('/infoProcedure/:procedureId',ProcedureController.infoProcedure)
  routes.put('/editProcedure/:procedureId',ProcedureController.editProcedure)
  routes.delete('/deleteProcedure/:procedureId',ProcedureController.deleteProcedure)
}