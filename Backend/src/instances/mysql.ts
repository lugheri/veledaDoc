import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()

console.log(process.env.DB_HOST,process.env.DATABASE,process.env.DB_USER,process.env.DB_PASS)

export const sequelize = new Sequelize(
  process.env.DATABASE as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT as string),
    timezone: '-03:00',
  }
)