import { Engine } from 'scent'

import { resolver } from './inject'
import { objectEach } from './core/util'

import registerSystems from './registerSystems'
import registerEntities from './registerEntities'

const engineInitializer = config => (engine, provide) => {
  const dependencies = resolver(config)
  objectEach(provide, dependencies)
}

export default (config, app) => {
  const engine = new Engine(engineInitializer(config))
  registerEntities(engine, app)
  registerSystems(engine)
  return engine
}
