import { createContext, useEffect, useState } from 'react';
import api from '../services/api';
import { AuthContextType,User,AuthProviderProps,TokenProps } from './Dtos/auth.dto';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [ userData, setUserData] = useState<User | null>(null);
  const [ authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [ token, setToken] = useState<boolean | null>(null);
  const [ levelAccess, setLevelAccess] = useState<number>(0);

  //Validation Data
  const validation = async () => {
    if(localStorage.getItem('Token')){
     
      try{
        const verificateValidationToken = await api.get('/validation',{
          headers: {            
            authorization: localStorage.getItem('Token')
          }
        })
        if(verificateValidationToken.data){
          const dataToken:TokenProps = verificateValidationToken.data;    
          const getUserData = await api.get(`/getUser/${dataToken.userId}`, {
            headers: {
              authorization: localStorage.getItem('Token')
            }
          });  
          setUserData(getUserData.data.response)           
          const credential = userData ? await api.get(`/getCredential/${userData.credential}`) : null
          setLevelAccess(credential ? credential.data.response.level_id : 0)
          setAuthenticated(true)
          setToken(true)
          return
        }
      }catch(err){
        console.log(err)
      }
    }
    localStorage.removeItem('Token');
    setUserData(null);
    setAuthenticated(false)
    setToken(false)
  }
  
  useEffect(()=>{
    validation()
  },[token])
  
  const contextValue:AuthContextType = {authenticated, userData, levelAccess}    
  return(
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}