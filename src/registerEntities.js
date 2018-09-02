import * as entities from './entities'
import { mapParser, entityBuilder } from './core'

import mapData from '../assets/maps/first'
import wallDef from '../assets/entity/wall'

const entityDefinitions = {
  [wallDef.id]: wallDef,
}

const entitiesLoader = (registerEntity) => {
  const initEntitiesFromLayer = layer => {
    const entitiesData = mapParser.parseLayer(layer.data, entityDefinitions)
    entitiesData.forEach(registerEntity)
  }

  mapData.layers.forEach(initEntitiesFromLayer)

  const mapEntityData = mapParser.parseMapDefinition(mapData)
  registerEntity(mapEntityData)
}

export default (engine) => {
  const registerEntities = entityBuilder(engine, entities)
  entitiesLoader(registerEntities)
}
