import { Engine } from 'scent'

import { resolver } from './inject'
import { objectEach } from './core/util'

import registerSystems from './registerSystems'
import registerEntities from './registerEntities'

const config = {
  target: null,
  width: 800,
  height: 500,
}

const engineInitializer = (engine, provide) => {
  const dependencies = resolver(config)
  objectEach(provide, dependencies)
}

export default () => {
  const engine = new Engine(engineInitializer)
  registerEntities(engine)
  registerSystems(engine)
  return engine
}
