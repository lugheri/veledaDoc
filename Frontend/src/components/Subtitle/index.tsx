import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Fas from "@fortawesome/free-solid-svg-icons";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type SubTitleType = {
  icon?:null | keyof typeof Fas ;
  title?: string;
}

export const SubTitle : React.FC<SubTitleType> = (props) => {
  return(
    <div className="flex mt-1 mb-4">
      <p className="text-sky-800 flex text-lg items-end">
        { props.icon ? (
          <FontAwesomeIcon className="m-1 text-2xl opacity-30" icon={Fas[props.icon] as IconProp}/>
        ) : false}  
        { props.title ? props.title : false }        
      </p>
    </div>
  )


}