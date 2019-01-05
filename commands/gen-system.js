import fs from 'fs'
import program from 'commander'
import { createLogger } from './log'

import {
  pathGen,
  staticPaths as paths,
  strUtils,
} from './utils'

import genUtils from './gen-utils'

const logger = createLogger('Add system')

program
  .usage('generate system')
  .parse(process.argv)

const system = program.args[0]

if (!system) {
  logger.error('You must specify system name'.red)
  process.exit(1)
}

const buildSource = () => `import * as c from '@app/components'
import * as n from '@app/nodes'

export default () => ({
  nodes: [],

  update(node) {

  },
})
`

const indexFile = pathGen.system('index')
const systemFile = pathGen.system(system)

genUtils.generate({
  filePath: systemFile,
  source: buildSource(),
})


const generateExportLine = name => `export { default as ${name} } from './${name}'`

const exportLine = generateExportLine(system)
const fileData = fs.readFileSync(indexFile, { encoding: 'utf8' })
const lines = fileData.split('\n').filter(line => line !== '')
const hasExportLine = lines.find(line => line.includes(system))

if (!hasExportLine) {
  const finalLines = [...lines, exportLine]

  genUtils.update({
    filePath: indexFile,
    source: finalLines.join('\n'),
  })
}
