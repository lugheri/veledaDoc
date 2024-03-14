export type CredentialDTO = {
  id:number;
  level_id:number;
  name:string;
  description:string;
  status:number;
  SysLevel: {
    name: string;
  };
};