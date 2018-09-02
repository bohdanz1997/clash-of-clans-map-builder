import { Engine } from 'scent'

import { entityLoader } from './core'
import { resolver } from './inject'
import { registerSystems } from './systems'
import { objectEach } from './core/util'

import mapData from '../assets/maps/first'
import wallDef from '../assets/entity/wall'

const entityDefinitions = {
  [wallDef.id]: wallDef,
}

const config = {
  target: document.body,
  width: 800,
  height: 500,
}

const engineInitializer = (engine, provide) => {
  const dependencies = resolver(config)
  objectEach(provide, dependencies)
}

export const createEngine = () => {
  const engine = new Engine(engineInitializer)
  entityLoader(engine, entityDefinitions, mapData)
  registerSystems(engine)
  return engine
}
