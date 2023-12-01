import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface AccountsInstance extends Model{
  id:number;
  date:string;
  logo:number;
  name:string;
  cnpj:string;
  description:string;
  status:number;
}

export const Accounts = sequelize.define<AccountsInstance>('Accounts',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  date:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  }, 
  logo:{
    type:DataTypes.INTEGER
  },
  name:{
    type:DataTypes.STRING
  },
  cnpj:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'accounts',
  timestamps:false
})
