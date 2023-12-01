import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ProceduresInstance extends Model{
  id:number;
  icon:string;
  name:string;
  description:string;
  professional:number;
  contract:number;
  status:number;
}

export const Procedures = sequelize.define<ProceduresInstance>('Procedures',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  icon:{
    type:DataTypes.STRING
  }, 
  name:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  professional:{
    type:DataTypes.INTEGER
  },
  contract:{
    type:DataTypes.INTEGER
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'procedures',
  timestamps:false
})
