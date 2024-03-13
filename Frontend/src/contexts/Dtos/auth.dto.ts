
export interface User{
  id:number;
  account_id:number;
  photo:number;
  name:string;
  username:string;
  mail:string;
  credential:number;
  password:string;
  reset:number;
  logged:number;
  status:number;
  createdAt:string;
  updatedAt:string;
}

export interface ICredential {
  id: number;
  account_id:number;
  level_id: number;
  name: string;
  description: string;
  status: number;
}

export interface AuthContextType {
  authenticated: boolean | null;
  userData: User  | null;
  levelAccess: number ;
}

export interface AuthProviderProps{
  children: React.ReactNode;
}

export interface PrivateProps {
  Item: React.ComponentType; // Tipo do componente Item que será renderizado
}

export interface TokenProps {
  userId: number;
}