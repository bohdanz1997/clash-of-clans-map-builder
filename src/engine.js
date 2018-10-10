import { Engine } from 'scent'

import { objectEach } from './core/util'

import registerSystems from './registerSystems'
import registerEntities from './registerEntities'

const engineInitializer = dependencies => (engine, provide) => {
  objectEach(provide, dependencies)
}

export default (config, dependencies) => {
  const engine = new Engine(engineInitializer(dependencies))

  registerEntities(engine, config)
  registerSystems(engine)

  return engine
}
