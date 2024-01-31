import { Router } from 'express';
import routesAuth from './routesAuth';
import routesPatient from './routesPatient';
import routesProcedures from './routesProcedures';
import routesProfessional from './routesProfessional';
import routesUsers from './routesUsers';
import routesSecurity from './routesSecurity';
import routesSystem from './routesSystem';
import routesAdvancedSettings from './routesAdvancedSettings';
import routesContracts from './routesContracts';

const routes = Router();
routesAuth(routes);
//Schedules
//Patients
routesPatient(routes)
//Treatments
routesProcedures(routes)
routesProfessional(routes)
//Metrics
//Courses
//Settings
routesContracts(routes)
routesUsers(routes);
routesSecurity(routes);
routesSystem(routes)
routesAdvancedSettings(routes);

export default routes;