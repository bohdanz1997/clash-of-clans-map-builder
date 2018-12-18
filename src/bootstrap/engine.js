import { Engine } from 'scent'
import { objectEach } from 'core/util'

import { registerEntities, registerSystems } from '.'

const engineInitializer = scope => (engine, provide) => {
  objectEach(provide, scope)
}

export default (scope) => {
  const engine = new Engine(engineInitializer(scope))

  registerEntities(engine, scope)
  registerSystems(engine)

  return engine
}
