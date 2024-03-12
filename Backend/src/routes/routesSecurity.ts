import { Router } from "express";
import CredentialController from "../controllers/CredentialController";
import LevelsController from "../controllers/LevelsController";
import PoliciesController from "../controllers/PoliciesController";

export default (routes:Router) => {
  //Credentials  
  routes.get(`/totalCredentials/:account_id/:status`,CredentialController.totalCredentials)
  routes.get(`/listCredentials/:account_id/:status/:pag`,CredentialController.listCredentials)
  routes.get(`/getCredential/:credentialId`,CredentialController.getCredential)
  routes.post(`/newCredential`,CredentialController.newCredential)
  routes.patch(`/updateCredential/:credentialId`,CredentialController.updateCredential)
  routes.delete(`/deleteCredential/:credentialId`,CredentialController.deleteCredential)
  //Levels
  routes.get(`/totalLevels/:account_id/:status`,LevelsController.totalLevels)
  routes.get(`/listLevels/:account_id/:status/:pag`,LevelsController.listLevels)
  routes.get(`/getLevel/:levelId`,LevelsController.getLevel)
  routes.post(`/newLevel`,LevelsController.newLevel)
  routes.patch(`/updateLevel/:levelId`,LevelsController.updateLevel)
  routes.delete(`/deleteLevel/:levelId`,LevelsController.deleteLevel)
  //Policies
  routes.get(`/listPolicies/:account_id/:status/:pag`,PoliciesController.listPolicies)
  routes.get(`/getPolicy/:policyId`,PoliciesController.getPolicy)
  routes.post(`/newPolicy`,PoliciesController.newPolicy)
  routes.patch(`/updatePolicy/:policyId`,PoliciesController.updatePolicy)
  routes.delete(`/deletePolicy/:policyId`,PoliciesController.deletePolicy)
}