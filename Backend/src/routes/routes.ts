import { Router } from 'express';
import routesAuth from './routesAuth';
import routesContracts from './routesContracts';
import routesUsers from './routesUsers';
import routesSecurity from './routesSecurity';
import routesSystem from './routesSystem';

const routes = Router();
routesAuth(routes);
routesContracts(routes)
routesUsers(routes);
routesSecurity(routes);
routesSystem(routes)

export default routes;