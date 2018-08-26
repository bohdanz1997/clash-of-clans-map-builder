import { Engine } from 'scent'

import * as systems from './systems'
import { mapParser, entityBuilder } from './core'

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

const registerSystems = engine => {
  Object.values(systems).forEach(s => engine.addSystem(() => s(engine)))
}

const registerEntities = engine => {
  const registerEntity = entityBuilder.buildAndAddEntity(engine)

  const initEntitiesFromLayer = layer => {
    const entitiesData = mapParser.parseLayer(layer.data, entityDefinitions)
    entitiesData.forEach(registerEntity)
  }

  mapData.layers.forEach(initEntitiesFromLayer)

  const mapEntityData = mapParser.parseMapDefinition(mapData)
  registerEntity(mapEntityData)
}
