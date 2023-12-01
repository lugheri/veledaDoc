import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface TreatmentsInstance extends Model{
  id:number;
  date:string;
  name:string;
  description:string;
  professional:number;
  status:number;
}

export const Treatments = sequelize.define<TreatmentsInstance>('Treatments',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  date:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  }, 
  name:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  professional:{
    type:DataTypes.INTEGER
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'treatments',
  timestamps:false
})
