import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface SysAccountsInstance extends Model{
  id:number;
  account_owner:number;
  date:string;
  logo:number;
  name:string;
  cnpj:string;
  description:string;
  status:number;
}

export const SysAccounts = sequelize.define<SysAccountsInstance>('SysAccounts',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  account_owner:{
    type:DataTypes.INTEGER,
    defaultValue:0
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
  tableName: 'sys_accounts',
  timestamps:false
})
