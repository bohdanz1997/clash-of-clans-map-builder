import { Engine } from 'scent'

import { resolver } from './inject'
import { objectEach } from './core/util'

import registerSystems from './registerSystems'
import registerEntities from './registerEntities'

const engineInitializer = dependencies => (engine, provide) => {
  objectEach(provide, dependencies)
}

export default (config, app) => {
  const dependencies = resolver(config, app)
  const engine = new Engine(engineInitializer(dependencies))

  registerEntities(engine)
  registerSystems(engine)

  return engine
}
