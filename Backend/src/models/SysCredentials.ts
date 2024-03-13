import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { SysLevels } from './SysLevels';

export interface SysCredentialsInstance extends Model{
  id:number;
  account_id:number;
  level_id:number;
  name:string;
  description:string;
  status:number;
}

export const SysCredentials = sequelize.define<SysCredentialsInstance>('SysCredentials',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  account_id:{
    type:DataTypes.INTEGER
  }, 
  level_id:{
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
  tableName: 'sys_credentials',
  timestamps:false
})
SysCredentials.hasOne(SysLevels,{foreignKey:'id', sourceKey:'level_id'})