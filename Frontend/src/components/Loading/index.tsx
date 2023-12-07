import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

export const Loading = () => {
  const [ loading, setLoading ] = useState(false)
  useEffect(()=>{
    setTimeout(()=>{setLoading(true)},500)
  },[])
  return(
    <div className="flex flex-col justify-center items-center my-4 p-2 flex-1">
      <p className="text-sky-600 font-light text-xs m-2">
        <FontAwesomeIcon className="text-[.35rem] pr-1" icon={Fas.faCircle} beatFade/> 
        {loading && <FontAwesomeIcon className="text-[.35rem] pr-1" icon={Fas.faCircle} beat/> }
        <FontAwesomeIcon className="text-[.35rem] pr-1" icon={Fas.faCircle} beatFade/> 
      </p>
    </div>
  )
}