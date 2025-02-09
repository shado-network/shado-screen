import sqlite3 from 'sqlite3'
import { Sequelize } from 'sequelize'

const db = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: './src/data/database/database.sqlite',
})

export default db
