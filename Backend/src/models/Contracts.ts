import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ContractsInstance extends Model{
  id:number;
  date:string;
  name:string;
  description:string;
  status:number;
}

export const Contracts = sequelize.define<ContractsInstance>('Contracts',{
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
  tableName: 'contracts',
  timestamps:false
})
