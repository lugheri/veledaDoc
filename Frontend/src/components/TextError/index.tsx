import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type TextErrorProps = {
  icon?:null | keyof typeof Fas ;
  error?: string;
}

export const TextError : React.FC<TextErrorProps> = (props) => {
  return(
    <p 
      className="text-red-500 p-2 rounded text-center my-4">
      { props.icon && (
        <FontAwesomeIcon icon={Fas[props.icon] as IconProp} className="opacity-70 mr-2" beat/> 
      )} 
      { props.error ? props.error : false }        
    </p>
  )
}