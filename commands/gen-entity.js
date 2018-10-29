import fs from 'fs'
import program from 'commander'
import { createLogger } from './log'

import {
  pathGen,
  strUtils,
  staticPaths as paths,
} from './utils'

import genUtils from './gen-utils'

const logger = createLogger('Add entity')

program
  .usage('generate entity')
  .option('--hoc', 'add HOCs boilerplate')
  .parse(process.argv)

const entity = program.args[0]

if (!entity) {
  logger.error('You must specify entity name'.red)
  process.exit(1)
}

const buildSource = (name, withHoc) => {
  const hocImport = `import { withComponents, pipeHOCs } from '${paths.componentsHoc}'\n`
  const defaultSource = `createEntity(

  )`

  const hocSource = `pipeHOCs(
    withComponents(

    ),
  )`

  return `import { createEntity } from '${paths.coreFactories}'
import * as c from '${paths.components}'
${withHoc ? hocImport : ''}
export default () => (
  ${withHoc ? hocSource : defaultSource}
)\n`
}

const indexFile = pathGen.entity('index')
const entityFile = pathGen.entity(entity)

genUtils.generate({
  filePath: entityFile,
  source: buildSource(entity, program.hoc),
})

const generateExportLine = name => `export { default as ${strUtils.capitalizeFirst(name)} } from './${name}'\n`

const exportLine = generateExportLine(entity)
const fileData = fs.readFileSync(indexFile, { encoding: 'utf8' })
const lines = fileData.split('\n').filter(line => line !== '')
const hasExportLine = lines.find(line => line.includes(entity))

if (!hasExportLine) {
  const finalLines = [...lines, exportLine]

  genUtils.update({
    filePath: indexFile,
    source: finalLines.join('\n'),
  })
}
