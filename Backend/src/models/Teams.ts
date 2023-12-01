import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { User } from './Users';

export interface TeamsInstance extends Model{
  id:number;
  name:string;
  description:string;
  status:number;
}

export const Teams = sequelize.define<TeamsInstance>('Teams',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  name:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  status:{
    type:DataTypes.STRING
  }
},{
  tableName:'teams',
  timestamps:false
})
Teams.hasOne(User, {foreignKey:'team_id',sourceKey:'id'})