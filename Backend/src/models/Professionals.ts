import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ProfessionalsInstance extends Model{
  id:number;
  date:string;
  photo:number;
  name:string;
  status:number;
}

export const Professionals = sequelize.define<ProfessionalsInstance>('Professionals',{
  id:{
    primaryKey:true,
    autoIncrement:true,
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
  tableName: 'professionals',
  timestamps:false
})
