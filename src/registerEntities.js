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

const entitiesLoader = (registerEntity, config, entityParamsProvider) => (mapData) => {
  const initEntitiesFromLayer = (layer) => {
    const entitiesData = mapParser.parseLayer(layer.data, entitiesDefinitions)
    entitiesData.forEach(registerEntity)
  }

  mapData.layers.unshift(generateGroundLayer(config))
  mapData.layers.forEach(initEntitiesFromLayer)

  const entityParams = mapParser.parseMapDefinition(mapData, entitiesDefinitions)
  const changedEntityParams = entityParamsProvider(entityParams)
  registerEntity(changedEntityParams)
}

export default (engine, config) => {
  const registerEntity = entityBuilder(engine, config, entitiesFactories)

  // TODO: move to another place
  const toScreenCoords = ({ x, y }) => ({ x: x * config.cellWidth, y: y * config.cellWidth })
  const entityParamsProvider = (entityParams) => {
    if (entityParams.x !== undefined && entityParams.y !== undefined) {
      return {
        ...entityParams,
        ...toScreenCoords(entityParams),
      }
    }
    return entityParams
  }
  entitiesLoader(registerEntity, config, entityParamsProvider)(mapsDefinitions.first)
}
