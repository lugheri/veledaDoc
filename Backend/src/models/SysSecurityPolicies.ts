import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface SysSecurityPoliciesInstance extends Model{
  id:number;
  account_id:number;
  level_id:number;
  module_id:number;
  parent_module_id:number;
  active:number;  
}

export const SysSecurityPolicies = sequelize.define<SysSecurityPoliciesInstance>('SysSecurityPolicies',{
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
  module_id:{
    type:DataTypes.INTEGER
  },
  parent_module_id:{
    type:DataTypes.INTEGER
  },
  active:{
    type:DataTypes.TINYINT
  }
},{
  tableName: 'sys_security_policies',
  timestamps:false
})
