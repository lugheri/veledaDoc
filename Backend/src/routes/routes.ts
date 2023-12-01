import { Router } from 'express';
import routesAuth from './routesAuth';
import routesUsers from './routesUsers';
import routesSecurity from './routesSecurity';
import routesSystem from './routesSystem';

const routes = Router();
routesAuth(routes);
routesUsers(routes);
routesSecurity(routes);
routesSystem(routes)

export default routes;