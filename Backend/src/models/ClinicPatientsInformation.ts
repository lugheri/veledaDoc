import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ClinicPatientInformationInstance extends Model{
  id:number;
  clinic_id:number;
  admission_date:string;
  name:string;
  gender:string;
  observations:string;
  status:number;
}

export const ClinicPatientInformation = sequelize.define<ClinicPatientInformationInstance>('ClinicPatientInformation',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  clinic_id:{
    type:DataTypes.INTEGER
  }, 
  admission_date:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  },
  name:{
    type:DataTypes.STRING
  },
  gender:{
    type:DataTypes.STRING
  },
  observations:{
    type:DataTypes.TEXT
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'clinic_patient_information',
  timestamps:false
})
