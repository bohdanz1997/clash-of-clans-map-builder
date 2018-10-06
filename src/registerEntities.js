import {
  mapParser,
  entityBuilder,
  jsModuleLoader,
  jsonModuleLoader,
} from './core'

const entitiesFactories = jsModuleLoader(require.context('./entities'))
const mapsDefinitions = jsonModuleLoader(require.context('./assets/map'))
const entitiesDefinitions = jsonModuleLoader(require.context('./assets/entity'))

const mapData = mapsDefinitions.first

const entitiesLoader = (registerEntity) => {
  const initEntitiesFromLayer = (layer) => {
    const entitiesData = mapParser.parseLayer(layer.data, entitiesDefinitions)
    entitiesData.forEach(registerEntity)
  }

  mapData.layers.forEach(initEntitiesFromLayer)

  const mapEntityData = mapParser.parseMapDefinition(mapData, entitiesDefinitions)
  registerEntity(mapEntityData)
}

export default (engine) => {
  const registerEntity = entityBuilder(engine, entitiesFactories)
  entitiesLoader(registerEntity)
}
