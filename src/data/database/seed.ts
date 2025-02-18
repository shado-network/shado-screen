// @ts-nocheck
import db from './database.ts'

import Puppet from './models/Puppet.ts'
import Play from './models/Play.ts'

// NOTE: Create tables.
await Puppet.sync()
await Play.sync()

// NOTE: Add initial data.
await Puppet.create({
  identifier: 'good',
  key: 'sp-good',
  http_url: 'http://localhost:10101',
  ws_url: 'ws://localhost:10102',
})

await Puppet.create({
  identifier: 'evil',
  key: 'sp-evil',
  http_url: 'http://localhost:10111',
  ws_url: 'ws://localhost:10112',
})

await Puppet.create({
  identifier: 'omnipotent',
  key: 'sp-omnipotent',
  http_url: 'http://localhost:11001',
  ws_url: 'ws://localhost:11002',
})

db.close()

console.log('Done!')
