import fs from 'fs'
import program from 'commander'

import {
  capitalizeFirst,
  argParser,
  pathGen,
} from './utils'

program
  .usage('generate component')
  .option('-f, --fields <items>', 'component fields definition', argParser.list)
  .parse(process.argv)

const component = program.args[0]

if (!component) {
  console.error('You must specify component')
  process.exit(1)
}

const generateSource = (name, fields = []) => {
  const componentName = capitalizeFirst(name)
  const componentTypeName = `c${componentName}`
  const coreFactoriesPath = '../core/factories'

  const paramsSource = fields.length > 0
    ? `'${name}', '${fields.join(' ')}',`
    : `'${name}',`

  return `import { createComponent } from '${coreFactoriesPath}'

export const [${componentTypeName}, ${componentName}] = createComponent(
  ${paramsSource}
)
`
}

const filePath = pathGen.component(component)
const source = generateSource(component, program.fields)

fs.writeFileSync(filePath, source)

console.log('Generated:', filePath, '\n')
console.log(source)
