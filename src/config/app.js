import path from 'path'

import {
  jsModuleLoader,
  jsonModuleLoader,
} from 'core'

const root = path.resolve(__dirname, '../')

const entityFactories = jsModuleLoader(require.context('../entities'))
const mapDefinitions = jsonModuleLoader(require.context('assets/map'))
const entityDefinitions = jsonModuleLoader(require.context('assets/entity'))

export default {
  paths: {
    root,
    entities: path.resolve(root, 'entities'),
    systems: path.resolve(root, 'systems'),
  },

  dirs: {
    entities: './entities',
    systems: './systems',
  },

  mapDefinitions,
  entityFactories,
  entityDefinitions,
}
