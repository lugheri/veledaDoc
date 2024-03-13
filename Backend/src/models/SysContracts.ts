import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface SysContractsInstance extends Model{
  id:number;
  date:string;
  name:string;
  description:string;
  status:number;
}

export const SysContracts = sequelize.define<SysContractsInstance>('SysContracts',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  date:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  }, 
  name:{
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
  tableName: 'sys_contracts',
  timestamps:false
})
