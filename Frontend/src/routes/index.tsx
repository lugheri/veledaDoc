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
import { Schedule } from "../pages/Schedule";
//PATIENTS
import { Patients } from "../pages/Patients";
//TREATMENTS
import { Treatment } from "../pages/Treatment";
import { Procedures } from "../pages/Treatment/Procedures";
import { Professionals } from "../pages/Treatment/Professionals";
import { Combo } from "../pages/Treatment/Combo";
//METRICS
//COURSES
//SETTINGS
import { Settings } from "../pages/Settings";
import { Users } from "../pages/Settings/Modules/Users";
import { Advanced } from "../pages/Settings/Modules/Advanced";
import { Levels } from "../pages/Settings/Modules/Levels";
import { Credentials } from "../pages/Settings/Modules/Credentials";
import { OpenContract } from "../pages/Settings/Modules/Advanced/components/Contracts/OpenContract";


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
              path:'/newContract',
              children:[
                { index: true, element:<Schedule/>}
              ]
            },       
            {
              path:'/schedule',
              children:[
                { index: true, element:<Schedule/>}
              ]
            },            
            {
              path:'/patient',
              children:[
                { index: true, element:<Patients/>}
              ]
            },
            {
              path:'/treatment',
              children:[
                { index: true, element:<Treatment/>},
                { path: '/treatment/procedures', element:<Procedures/>},
                { path: '/treatment/professionals', element:<Professionals/>},
                { path: '/treatment/combo', element:<Combo/>},
                
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