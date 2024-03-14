import { TitlePageType } from "./Dto/titlepage.dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";

import { IconProp } from '@fortawesome/fontawesome-svg-core';



export const TitlePage : React.FC<TitlePageType> = (props) => {
  return(
    <div className="flex justify-between items-center bg-white shadow p-4 mb-1">
      <div className="text-gray-600">
        <p className="text-sky-800 font-bold flex items-end">
          { props.icon ? (<FontAwesomeIcon className="m-1 text-2xl opacity-30" icon={Fas[props.icon] as IconProp}/>) : false}  
          { props.title ? props.title : false }        
        </p>
        { props.description ? (<small className="text-sm font-light text-neutral-600">{props.description}</small>): false }      
      </div>
      { props.rightComponent ? props.rightComponent : false } 
    </div>
  )
}