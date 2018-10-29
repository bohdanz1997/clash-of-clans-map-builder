import fs from 'fs'
import program from 'commander'
import { createLogger } from 'core/log'

import {
  pathGen,
  argParser,
  strUtils,
} from './utils'

import genUtils from './gen-utils'

const logger = createLogger('Add component')

program
  .usage('generate component')
  .option('-f, --fields <items>', 'component fields definition', argParser.list)
  .parse(process.argv)

const component = program.args[0]

if (!component) {
  logger.error('You must specify component name'.red)
  process.exit(1)
}

const buildSource = (name, fields = []) => {
  const componentName = strUtils.capitalizeFirst(name)
  const componentTypeName = `c${componentName}`
  const coreFactoriesPath = 'core/factories'

  const paramsSource = fields.length > 0
    ? `'${name}', '${fields.join(' ')}',`
    : `'${name}',`

  return `import { createComponent } from '${coreFactoriesPath}'

export const [${componentTypeName}, ${componentName}] = createComponent(
  ${paramsSource}
)
`
}

const indexFile = pathGen.component('index')
const componentFile = pathGen.component(component)

genUtils.generate({
  filePath: componentFile,
  source: buildSource(component, program.fields),
})

const generateExportLine = name => `export * from './${name}'\n`

const exportLine = generateExportLine(component)
const fileData = fs.readFileSync(indexFile, { encoding: 'utf8' })
const lines = fileData.split('\n').filter(line => line !== '')
const hasExportLine = lines.find(line => line.includes(component))

if (!hasExportLine) {
  const finalLines = [...lines, exportLine]

  genUtils.update({
    filePath: indexFile,
    source: finalLines.join('\n'),
  })
}
