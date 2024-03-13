import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface SysAvailableTreatmentsInstance extends Model{
  id:number;
  name:string;
  description:string;
  clausule:string;
  status:number;
}

export const SysAvailableTreatments = sequelize.define<SysAvailableTreatmentsInstance>('SysAvailableTreatments',{
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
  tableName:'sys_available_treatments',
  timestamps:false
})