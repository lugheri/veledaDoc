import { CardType } from "./Dto/cards.dto"

export const Card: React.FC<CardType> = (props) => {
  return(
    <div className={`flex w-full m-1 p-4 shadow bg-white rounded-md ${props.className}`}>
      {props.component}
    </div>
  )

} 