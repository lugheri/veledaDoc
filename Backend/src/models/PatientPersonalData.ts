import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface PatientPersonalDataInstance extends Model{
  id:number;
  patient_id:number;  
  age:number
}

export const PatientPersonalData = sequelize.define<PatientPersonalDataInstance>('PatientPersonalData',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  patient_id:{
    type:DataTypes.INTEGER
  },  
  age:{
    type:DataTypes.INTEGER
  }
},{
  tableName: 'clinic_patient_personal_data',
  timestamps:false
})
