import {
  mapParser,
  entityBuilder,
  jsModuleLoader,
  jsonModuleLoader,
} from './core'
import { generateGroundLayer } from './services'

const entitiesFactories = jsModuleLoader(require.context('./entities'))
const mapsDefinitions = jsonModuleLoader(require.context('./assets/map'))
const entitiesDefinitions = jsonModuleLoader(require.context('./assets/entity'))

const mapData = mapsDefinitions.first

const entitiesLoader = (registerEntity, config) => {
  const initEntitiesFromLayer = (layer) => {
    const entitiesData = mapParser.parseLayer(layer.data, entitiesDefinitions)
    entitiesData.forEach(registerEntity)
  }

  mapData.layers.unshift(generateGroundLayer(config))
  mapData.layers.forEach(initEntitiesFromLayer)

  const mapEntityData = mapParser.parseMapDefinition(mapData, entitiesDefinitions)
  registerEntity(mapEntityData)
}

export default (engine, config) => {
  const registerEntity = entityBuilder(engine, config, entitiesFactories)
  entitiesLoader(registerEntity, config)
}
