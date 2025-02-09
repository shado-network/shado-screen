import { DataTypes } from 'sequelize'

// @ts-ignore
// NOTE: *.ts extension allows it to work with seed script.
import db from '../database.ts'

const Play = db.define(
  'Play',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    identifier: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    key: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  },
  {
    // tableName: 'Plays',
    // paranoid: true,
  },
)

export default Play
