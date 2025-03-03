// @ts-nocheck
import db from './database.ts'

import Puppet from './models/Puppet.ts'
import Play from './models/Play.ts'

// NOTE: Create tables.
try {
  await Puppet.sync()
  await Play.sync()
} catch (error) {
  console.error('Error while creating tables', error)
}

// NOTE: Add initial data.

// NOTE: Puppets
try {
  await Puppet.create({
    identifier: 'good',
    key: 'sp-good',
    http_url: 'http://localhost:10101',
    ws_url: 'ws://localhost:10102',
  })
} catch (error) {
  console.error('Error while adding data', error)
}

try {
  await Puppet.create({
    identifier: 'evil',
    key: 'sp-evil',
    http_url: 'http://localhost:10111',
    ws_url: 'ws://localhost:10112',
  })
} catch (error) {
  console.error('Error while adding data', error)
}

try {
  await Puppet.create({
    identifier: 'omnipotent',
    key: 'sp-omnipotent',
    http_url: 'http://localhost:11001',
    ws_url: 'ws://localhost:11002',
  })
} catch (error) {
  console.error('Error while adding data', error)
}

// NOTE: Plays.

try {
  await Play.create({
    identifier: 'bardo',
    key: 'sp-bardo',
    http_url: 'http://localhost:10001',
    ws_url: 'ws://localhost:10002',
  })
} catch (error) {
  console.error('Error while adding data', error)
}

db.close()

console.log('')
console.log('Done!')
