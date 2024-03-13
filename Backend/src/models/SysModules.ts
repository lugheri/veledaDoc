import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

import { SysSecurityPolicies } from './SysSecurityPolicies';

export interface SysModulesInstance extends Model{
  id:number;
  parent:number;
  name:string;
  alias:string;
  icon:string;
  description:string;
  type:string;
  order:number;
  status:number;
}

export const SysModules = sequelize.define<SysModulesInstance>('SysModules',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  parent:{
    type:DataTypes.INTEGER
  },
  name:{
    type:DataTypes.STRING
  },
  alias:{
    type:DataTypes.STRING
  },
  icon:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  }, 
  type:{
    type:DataTypes.STRING
  },
  order:{
    type:DataTypes.INTEGER
  },
  status:{
    type:DataTypes.TINYINT
  }
},{
  tableName: 'sys_modules',
  timestamps:false
})
SysModules.hasOne(SysSecurityPolicies, { foreignKey: 'module_id', sourceKey: 'id'});