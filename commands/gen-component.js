import program from 'commander'

import {
  pathGen,
  argParser,
  capitalizeFirst,
} from './utils'

import genUtils from './gen-utils'

program
  .usage('generate component')
  .option('-f, --fields <items>', 'component fields definition', argParser.list)
  .parse(process.argv)

const component = program.args[0]

if (!component) {
  console.error('You must specify component name'.red)
  process.exit(1)
}

const buildSource = (name, fields = []) => {
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

genUtils.generate({
  filePath: pathGen.component(component),
  source: buildSource(component, program.fields),
})
