import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface ClinicConsultationsInstance extends Model{
  id:number;
  clinic_id:number;
  date:string;
  hour:string;
  period:string;
  professional_id:number;
  procedure_id:number;
  patient_id:number;
  state:number;
  observations:string;
  status:number;
}

export const ClinicConsultations = sequelize.define<ClinicConsultationsInstance>('ClinicConsultations',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER,
  },
  clinic_id:{
    type:DataTypes.INTEGER
  },
  date:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  },
  hour:{
    type:DataTypes.TIME,
    defaultValue:DataTypes.NOW
  },
  period:{
    type:DataTypes.STRING
  },
  professional_id:{
    type:DataTypes.INTEGER
  },
  procedure_id:{
    type:DataTypes.INTEGER
  },
  patient_id:{
    type:DataTypes.INTEGER
  },
  state:{
    type:DataTypes.INTEGER
  },
  observations:{
    type:DataTypes.TEXT
  },
  status:{
    type:DataTypes.TINYINT
  },
},{
  tableName:'clinic_consultations',
  timestamps:false
})