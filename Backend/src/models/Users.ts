import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql'
import { Credentials } from './Credentials';


export interface UserInstance extends Model{
  id:number;
  account_id:number;
  photo:number;
  name:string;
  username:string;
  mail:string;
  credential:number;
  team_id:number;
  password:string;
  logged:number;
  reset:number;
  status:number;
  createdAt:string;
  updatedAt:string;
}

export const User = sequelize.define<UserInstance>("User",{
  id:{
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  account_id:{
    type: DataTypes.INTEGER
  },
  photo:{
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING
  },
  username:{
    type: DataTypes.STRING
  },
  mail:{
    type: DataTypes.STRING,
    defaultValue:''
  },
  credential:{
    type: DataTypes.INTEGER,
    defaultValue:0
  },
  team_id:{
    type: DataTypes.INTEGER,
    defaultValue:0
  },
  password:{
    type: DataTypes.STRING
  },
  logged:{
    type: DataTypes.TINYINT
  },
  reset:{
    type: DataTypes.TINYINT
  },
  status:{
    type: DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: "sys_users",
  timestamps: true
})
User.hasOne(Credentials, {foreignKey:'id', sourceKey:'credential'} )
