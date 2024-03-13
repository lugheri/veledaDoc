import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface ClinicConsultationStatesInstance extends Model{
  id:number;
  clinic_id:number;
  state_name:string;
  description:string;
  color:string;
  icon:string;
  status:number;
}

export const ClinicConsultationStates = sequelize.define<ClinicConsultationStatesInstance>('ClinicConsultationStates',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER,
  },
  clinic_id:{
    type:DataTypes.INTEGER
  },
  state_name:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.TEXT
  },
  color:{
    type:DataTypes.STRING
  },
  icon:{
    type:DataTypes.TEXT
  },
  status:{
    type:DataTypes.TINYINT
  },
},{
  tableName:'clinic_consultation_states',
  timestamps:false
})