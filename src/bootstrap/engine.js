import { Engine } from 'scent'
import { objectEach } from 'core/util'

import registerSystems from './systems'
import registerEntities from './entities'

const engineInitializer = deps => (engine, provide) => {
  objectEach(provide, deps)
}

export default (config, deps) => {
  const engine = new Engine(engineInitializer(deps))

  registerEntities(engine, deps)
  registerSystems(engine)

  return engine
}
