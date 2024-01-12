export interface IContract{
  id:number;
  date:string;
  name:string;
  description:string;
  status:number;
}

export interface IComponentsContract{
  id:number;
  contract_id:number;
  title:string;
  type:string;
  content:string;
  image:number;
  order:number;
  status:number;
}