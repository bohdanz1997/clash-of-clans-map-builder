import fs from 'fs'
import program from 'commander'

import {
  pathGen,
  argParser,
} from './utils'

import genUtils from './gen-utils'
import { createLogger } from './log'

const logger = createLogger('Remove component')

program
  .usage('generate component')
  .option('-f, --fields <items>', 'component fields definition', argParser.list)
  .parse(process.argv)

const component = program.args[0]

if (!component) {
  logger.error('You must specify component name'.red)
  process.exit(1)
}

const indexFile = pathGen.component('index')
const componentFile = pathGen.component(component)

genUtils.remove({
  filePath: componentFile,
})

const fileData = fs.readFileSync(indexFile, { encoding: 'utf8' })
const lines = fileData.split('\n')
const finalLines = lines.filter(line => !line.includes(component))

genUtils.update({
  filePath: indexFile,
  source: finalLines.join('\n'),
})
