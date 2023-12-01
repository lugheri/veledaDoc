import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ContractsSessionsInstance extends Model{
  id:number;
  date:string;
  contract_id:number;
  title:string;
  description:string;
  status:number;
}

export const ContractsSessions = sequelize.define<ContractsSessionsInstance>('ContractsSessions',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  date:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  }, 
  contract_id:{
    type:DataTypes.INTEGER
  },
  title:{
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
  tableName: 'contracts_sessions',
  timestamps:false
})
