import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface SysLevelsInstance extends Model{
  id:number;
  account_id:number;
  name:string;
  description:string;
  status:number;
}

export const SysLevels = sequelize.define<SysLevelsInstance>('SysLevels',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  account_id:{
    type:DataTypes.INTEGER
  },
  name:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'sys_levels',
  timestamps:false
})