import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateProps } from "../contexts/Dtos/auth.dto";
import useAuth from "../hooks/useAuth";
//Pages
import { Login } from "../pages/Login";
import { LoadScreen } from "../pages/LoadScreen";
import { ErrorPage } from "../pages/ErrorPage";

import { Template } from "../components/Template";

//Módules
import { Home } from "../pages/Home";
//PRODUCTS
import { Treatment } from "../pages/Treatment";
//SETTINGS
import { Settings } from "../pages/Settings";
import { Users } from "../pages/Settings/Modules/Users";
import { Advanced } from "../pages/Settings/Modules/Advanced";
import { Levels } from "../pages/Settings/Modules/Levels";
import { Credentials } from "../pages/Settings/Modules/Credentials";
import { Teams } from "../pages/Settings/Modules/Teams";
import { Professionals } from "../pages/Treatment/modules/Professionals";
import { Procedures } from "../pages/Treatment/modules/Procedures";
import { OpenContract } from "../pages/Settings/Modules/Advanced/components/OpenContract";


//Validate Auths
const Private: React.FC<PrivateProps> = ({Item}) => {
  const authenticate = useAuth();  
  return(
    authenticate === undefined ? <LoadScreen/> 
    : authenticate.authenticated === null ? <LoadScreen/> 
    : authenticate.authenticated ? <Item/> 
    : <Login/>
  );
}

const RoutesApp = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Private Item={Template}/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          errorElement:<ErrorPage/>,
          children:[
            { index: true, element: <Home/>},
            {
              path:'/dashboard',
              children:[
                { index: true, element:<Home/>},
                { path: '/dashboard/a', element:<Home/>},
                { path: '/dashboard/b', element:<Home/>},
              ]
            },
             {
              path:'/customerService',
              children:[
                { index: true, element:<Home/>},
                { path: '/customerService/serviceHistory', element:<Home/>},
              ]
            },
            {
              path:'/patient',
              children:[
                { index: true, element:<Home/>},
                { path: '/patient/history', element:<Home/>},
              ]
            },
            {
              path:'/treatment',
              children:[
                { index: true, element:<Treatment/>},
                { path: '/treatment/procedures', element:<Procedures/>},
                { path: '/treatment/professionals', element:<Professionals/>},
              ]
            },
            {
              path:'/reports',
              children:[
                { index: true, element:<Home/>},
                { path: '/reports/dataAnalysis', element:<Home/>},
              ]
            },
            {
              path:'/courses',
              children:[
                { index: true, element:<Home/>},
                { path: '/courses/dataAnalysis', element:<Home/>},
              ]
            },
            {
              path:'/settings',
              children:[
                { index: true, element:<Settings/>},
                { path: '/settings/users', element:<Users/>},
                { path: '/settings/teams', element:<Teams/>},
                { path: '/settings/credentials', element:<Credentials/>},
                { path: '/settings/levels', element:<Levels/>},
                { path: '/settings/advanced', element:<Advanced/>},
                { path: '/settings/advanced/openContract/:contract_id', element:<OpenContract/>}
              ]
            },
          ]
        }
      ]

    }
  ])
  return(
    <RouterProvider router={router}/>
  )
}
export default RoutesApp;