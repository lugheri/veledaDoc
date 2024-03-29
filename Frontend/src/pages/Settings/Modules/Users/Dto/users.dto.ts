export type UserDTO = {
  id:number;
  photo:number;
  name:string;
  username:string;
  mail:string;
  credential:number;
  password:string;
  logged:number;
  reset:number;
  status:number;
  createdAt:string;
  updatedAt:string;
  SysCredential: {
    "name": string
  }
};