import * as mapParser from './mapParser'
import * as entityBuilder from './entityBuilder'

export default (engine, entityDefinitions, mapData) => {
  const registerEntity = entityBuilder.buildAndAddEntity(engine)

  const initEntitiesFromLayer = layer => {
    const entitiesData = mapParser.parseLayer(layer.data, entityDefinitions)
    entitiesData.forEach(registerEntity)
  }

  mapData.layers.forEach(initEntitiesFromLayer)

  const mapEntityData = mapParser.parseMapDefinition(mapData)
  registerEntity(mapEntityData)
}
