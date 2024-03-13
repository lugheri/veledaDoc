import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ClinicPatientPersonalDataInstance extends Model{
  id:number;
  patient_id:number;    
  gender:string;
  age:number
}

export const ClinicPatientPersonalData = sequelize.define<ClinicPatientPersonalDataInstance>('ClinicPatientPersonalData',{
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
