// @ts-nocheck
import db from './database.ts'

import Puppet from './models/Puppet.ts'
import Play from './models/Play.ts'

await Puppet.sync()
await Play.sync()

db.close()

console.log('Done!')
