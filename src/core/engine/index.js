import { Engine } from 'scent'

import {
  createArcher,
} from '../../core/entities'

import * as systems from '../../systems'

export const createEngine = () => {
  const engine = new Engine()
  registerEntities(engine)
  registerSystems(engine)
  return engine
}

const registerSystems = engine => (
  Object.values(systems).forEach(s => engine.addSystem(s(engine)))
)

const registerEntities = engine => {
  engine.addEntity(createArcher({ x: 10, y: 10, speed: 2 }))
}
