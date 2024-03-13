import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface PatientInformationInstance extends Model{
  id:number;
  clinic_id:number;
  admission_date:string;
  name:string;
  status:number;
}

export const PatientInformation = sequelize.define<PatientInformationInstance>('PatientInformation',{
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
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'clinic_patient_information',
  timestamps:false
})
