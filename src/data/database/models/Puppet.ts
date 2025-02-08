import db from '../database'
import { DataTypes } from 'sequelize'

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
    // tableName: 'Puppets',
    paranoid: true,
  },
)

export default Puppet
