import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ProceduresInstance extends Model{
  id:number;
  clinic_id:string;
  type_treatment:number;
  name:string;
  description:string;
  professional_id:number;
  status:number;
}

export const Procedures = sequelize.define<ProceduresInstance>('Procedures',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  clinic_id:{
    type:DataTypes.INTEGER
  }, 
  type_treatment:{
    type:DataTypes.INTEGER
  },
  name:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  professional_id:{
    type:DataTypes.INTEGER
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'clinic_procedures',
  timestamps:false
})
