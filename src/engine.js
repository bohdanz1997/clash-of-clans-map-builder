import { Engine } from 'scent'

import * as systems from './systems'
import * as entities from './entities'

import config from './entities/config'

export const createEngine = () => {
  const engine = new Engine()
  registerEntities(engine)
  registerSystems(engine)
  return engine
}

const registerSystems = engine => (
  Object.values(systems).forEach(s => engine.addSystem(() => s(engine)))
)

const registerEntities = engine => {
  config.forEach((params) => {
    const { type } = params
    const entityFactory = entities[type]
    if (!entityFactory) {
      throw new Error(`Could not find entity factory for type '${type}'`)
    }
    engine.addEntity(entityFactory(params))
  })
}
