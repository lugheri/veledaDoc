import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface AvailableTreatmentsInstance extends Model{
  id:number;
  name:string;
  description:string;
  clausule:string;
  status:number;
}

export const AvailableTreatments = sequelize.define<AvailableTreatmentsInstance>('AvailableTreatments',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER,
  },
  name:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  clausule:{
    type:DataTypes.STRING
  },
  status:{
    type:DataTypes.TINYINT
  },
},{
  tableName:'available_treatments',
  timestamps:false
})