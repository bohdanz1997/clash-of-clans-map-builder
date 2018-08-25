import { Engine } from 'scent'

import * as systems from './systems'
import * as entities from './entities'
import * as mapParser from './core/mapParser'

import mapData from '../assets/maps/first'
import wallDef from '../assets/entity/wall'

const entityDefinitions = {
  [wallDef.id]: wallDef,
}

export const createEngine = () => {
  const engine = new Engine()
  registerEntities(engine)
  registerSystems(engine)
  return engine
}

const registerSystems = engine => (
  Object.values(systems).forEach(s => engine.addSystem(() => s(engine)))
)

const buildEntity = entityParams => {
  const { type } = entityParams
  const entityFactory = entities[type]
  if (!entityFactory) {
    throw new Error(`Could not find entity factory for '${type}'`)
  }
  return entityFactory(entityParams)
}

const buildAndAddEntity = engine => (entityParams) => {
  const entity = buildEntity(entityParams)
  engine.addEntity(entity)
}

const registerEntities = engine => {
  const initEntitiesFromLayer = layer => {
    const entitiesData = mapParser.parseLayer(layer.data, entityDefinitions)
    entitiesData.forEach(buildAndAddEntity(engine))
  }

  mapData.layers.forEach(initEntitiesFromLayer)
}
