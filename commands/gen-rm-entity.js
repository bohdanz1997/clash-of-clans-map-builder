import fs from 'fs'
import program from 'commander'
import { createLogger } from './log'

import {
  pathGen,
} from './utils'

import genUtils from './gen-utils'

const logger = createLogger('Remove entity')

program
  .usage('remove entity')
  .parse(process.argv)

const entity = program.args[0]

if (!entity) {
  logger.error('You must specify entity name'.red)
  process.exit(1)
}

const indexFile = pathGen.entity('index')
const entityFile = pathGen.entity(entity)

genUtils.remove({
  filePath: entityFile,
})

const fileData = fs.readFileSync(indexFile, { encoding: 'utf8' })
const lines = fileData.split('\n')
const finalLines = lines.filter(line => !line.includes(entity))

genUtils.update({
  filePath: indexFile,
  source: finalLines.join('\n'),
})
