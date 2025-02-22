import { DataTypes } from 'sequelize'

// @ts-ignore
// NOTE: *.ts extension allows it to work with seed script.
import db from '../database.ts'

const Puppet = db.define(
  'Puppet',
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
    key: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    http_url: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    ws_url: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  },
  {
    // tableName: 'Puppets',
    // paranoid: true,
  },
)

export default Puppet
