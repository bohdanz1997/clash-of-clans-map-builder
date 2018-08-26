import { Engine } from 'scent'

import * as systems from './systems'
import * as entities from './entities'
import { mapParser } from './core/tools'

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
  const { componentId } = entityParams
  if (componentId === undefined) {
    throw new Error(`Entity params must include 'componentId'`)
  }

  const entityFactory = entities[componentId]
  if (!entityFactory) {
    throw new Error(`Could not find entity factory for '${componentId}'`)
  }

  return entityFactory(entityParams)
}

const buildAndAddEntity = engine => (entityParams) => {
  const entity = buildEntity(entityParams)
  engine.addEntity(entity)
}

const registerEntities = engine => {
  const registerEntity = buildAndAddEntity(engine)

  const initEntitiesFromLayer = layer => {
    const entitiesData = mapParser.parseLayer(layer.data, entityDefinitions)
    entitiesData.forEach(registerEntity)
  }

  mapData.layers.forEach(initEntitiesFromLayer)

  const mapEntityData = mapParser.parseMapDefinition(mapData)
  registerEntity(mapEntityData)
}
