import db from '../database'
import { DataTypes } from 'sequelize'

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
