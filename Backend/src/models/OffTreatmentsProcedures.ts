import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface TreatmentsProceduresInstance extends Model{
  id:number;
  id_treatment:number;
  id_procedure:number;
}

export const TreatmentsProcedures = sequelize.define<TreatmentsProceduresInstance>('TreatmentsProcedures',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  id_treatment:{
    type:DataTypes.INTEGER
  },  
  id_procedure:{
    type:DataTypes.INTEGER
  }
},{
  tableName: 'treatment_procedures',
  timestamps:false
})
