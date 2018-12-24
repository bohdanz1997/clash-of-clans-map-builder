import createSystemsLoader from 'core/loaders/system'
import { gameConfig } from '../config'

export default (engine) => {
  const systemsLoader = createSystemsLoader({
    defaultSystemPriority: gameConfig.priorities.UPDATE,
  })

  const systemsContext = require.context('../systems')
  const systems = systemsLoader(systemsContext)

  systems.forEach(engine.addSystem)
}
