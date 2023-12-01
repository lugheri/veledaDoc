import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ContractsClausulesInstance extends Model{
  id:number;
  date:string;
  session_id:number;
  title:string;
  text:string;
  description:string;
  order:number;
  status:number;
}

export const ContractsClausules = sequelize.define<ContractsClausulesInstance>('ContractsClausules',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  date:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  }, 
  session_id:{
    type:DataTypes.INTEGER
  },
  title:{
    type:DataTypes.STRING
  },
  text:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  order:{
    type:DataTypes.INTEGER
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'contracts_clausules',
  timestamps:false
})
