import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface SysContractsComponentsInstance extends Model{
  id:number;
  contract_id:number;
  title:string;
  type:string;
  content:string;
  image:number;
  order:number;
  status:number;
}

export const SysContractsComponents = sequelize.define<SysContractsComponentsInstance>('SysContractsComponents',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  contract_id:{
    type:DataTypes.INTEGER
  },
  title:{
    type:DataTypes.STRING
  },
  type:{
    type:DataTypes.STRING
  },
  content:{
    type:DataTypes.STRING
  },
  image:{
    type:DataTypes.INTEGER
  },
  order:{
    type:DataTypes.INTEGER
  },
  status:{
    type:DataTypes.TINYINT,
    defaultValue:1
  }
},{
  tableName: 'sys_contracts_components',
  timestamps:false
})
