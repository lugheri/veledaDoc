import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import api from '../../services/api';

export const Login = () => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  const [ ErrorAuth, setErrorAuth ] = useState<boolean>(false)
  const [ messageErrorAuth, setMessageErrorAuth ] = useState<string>('')
  const [ causeErrorAuth, setCauseErrorAuth ] = useState<string>('')

  const sendAuth = async (e:FormEvent) => {
    e.preventDefault()
    try{
      const response = await api.post('/login', {
        username: username,
        password: password
      });
      if(response.data.success){
        localStorage.setItem('Token', response.data.token);
        window.location.reload();
      }else{
        setErrorAuth(true)
        setMessageErrorAuth(response.data.error.issues[0].message )
        setCauseErrorAuth('Verifique seus dados e tente novamente!')
      }
    }catch(err:any) {
      console.log(err)
      setErrorAuth(true)
      setMessageErrorAuth('Não foi possível efetuar o login')
      setCauseErrorAuth(err.message)
    }
  }


  return(
    <div className="flex bg-[#132434] bg-login-bg bg-no-repeat bg-right-bottom bg-blend-normal flex w-screen h-screen">
      <div className="flex flex-col w-1/3 h-full">
        <div className="flex p-6 justify-start items-center">
          <div className="h-14 w-[195px] flex justify-center items-center text-center">
            <p className="tracking-tighter text-3xl p-2 m-0 text-white font-thin">
              <span className="font-bold border-b-blue-400 border-b border-b-4">VELEDA</span> CTO
            </p> 
          </div>    
        </div>
        <div className="flex flex-col flex-1 justify-center items-center">
          <p className="text-white font-bold text-2xl">Bem vindo ao VELEDA CTO</p>
          <p className="text-slate-400 font-light text">Insira suas credenciais para acessar a sua conta.</p>
          <form onSubmit={sendAuth} className="flex flex-col justify-center items-center w-[60%] my-8">
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full mt-4 mb-2 border-none focus:ring-0 rounded" placeholder="Usuário" required/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full mb-4 border-none focus:ring-0 rounded" placeholder="Senha de Acesso" required/>
            <button className="text-sm font-semibold text-sky-600 hover:text-sky-50">Esqueceu a senha?</button> 
            <button type="submit" className="bg-sky-600 p-3 w-full text-white rounded my-4">
              Continue
            </button>
            {ErrorAuth ? ( 
            <strong title={causeErrorAuth} className="text-center text-sm text-red-500 py-4 px-3 mb-4">
              <FontAwesomeIcon icon={Fas.faExclamationTriangle}/> { messageErrorAuth }
            </strong>)
            :false}      
          </form>    
          <p className="py-8 text-xs text-slate-500">2023 Veleda DOC. Criado com <FontAwesomeIcon icon={Fas.faHeart}/> por Kraken Devs.</p>

        </div>
        
      </div>
    </div>
  )
}