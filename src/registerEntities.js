import * as entities from './entities'
import { mapParser, entityBuilder } from './core'

import mapData from './assets/maps/first'
import wallDef from './assets/entity/wall'
import playerDef from './assets/entity/player'

const entityDefinitions = {
  [wallDef.id]: wallDef,
  [playerDef.id]: playerDef,
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

export default (engine, app) => {
  const registerEntity = entityBuilder(engine, app, entities)
  entitiesLoader(registerEntity)
}
