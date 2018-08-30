import { Engine } from 'scent'

import * as systems from './systems'
import { entityLoader } from './core'

import mapData from '../assets/maps/first'
import wallDef from '../assets/entity/wall'

const entityDefinitions = {
  [wallDef.id]: wallDef,
}

export const createEngine = () => {
  const engine = new Engine()
  entityLoader(engine, entityDefinitions, mapData)
  registerSystems(engine, systems)
  return engine
}

const registerSystems = engine => {
  Object.values(systems).forEach(s => engine.addSystem(() => s(engine)))
}
