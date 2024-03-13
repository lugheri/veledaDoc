import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ClinicProfessionalsInstance extends Model{
  id:number;
  clinic_id:number;
  date:string;
  photo:number;
  name:string;
  status:number;
}

export const ClinicProfessionals = sequelize.define<ClinicProfessionalsInstance>('ClinicProfessionals',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  clinic_id:{
    type:DataTypes.INTEGER
  },
  date:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  }, 
  photo:{
    type:DataTypes.INTEGER
  },
  name:{
    type:DataTypes.STRING
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'clinic_professionals',
  timestamps:false
})
