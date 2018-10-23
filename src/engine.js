import { Engine } from 'scent'
import { objectEach } from 'core/util'

import registerSystems from './registerSystems'
import registerEntities from './registerEntities'

const engineInitializer = deps => (engine, provide) => {
  objectEach(provide, deps)
}

export default (config, deps) => {
  const engine = new Engine(engineInitializer(deps))

  registerEntities(engine, deps)

  registerSystems({
    engine,
    ignoredFiles: ['priorities'],
    context: require.context('./systems'),
  })

  return engine
}
