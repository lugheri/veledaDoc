
export interface User{
  id:number;
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