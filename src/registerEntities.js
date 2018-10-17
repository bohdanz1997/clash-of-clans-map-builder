import { entityBuilder } from './core/tools'
import { generateGroundLayer } from './services'

import {
  mapParser,
  jsModuleLoader,
  jsonModuleLoader,
} from './core'

const entitiesFactories = jsModuleLoader(require.context('./entities'))
const mapsDefinitions = jsonModuleLoader(require.context('./assets/map'))
const entitiesDefinitions = jsonModuleLoader(require.context('./assets/entity'))

const entitiesLoader = (registerEntity, config, entityParamsProvider) => (mapData) => {
  const initEntitiesFromLayer = (layer) => {
    const entitiesData = mapParser.parseLayer(layer.data, entitiesDefinitions)
    entitiesData.forEach((entityParams) => {
      const changedEntityParams = entityParamsProvider(entityParams)
      registerEntity(changedEntityParams)
    })
  }

  mapData.layers.unshift(generateGroundLayer(config))
  mapData.layers.forEach(initEntitiesFromLayer)

  const entityParams = mapParser.parseMapDefinition(mapData, entitiesDefinitions)
  const changedEntityParams = entityParamsProvider(entityParams)
  registerEntity(changedEntityParams)
}

export default (engine, deps) => {
  const registerEntity = entityBuilder(engine, deps, entitiesFactories)
  const { $config } = deps

  // TODO: move to another place
  const toScreenCoords = ({ x, y }) => ({ x: x * $config.cellWidth, y: y * $config.cellWidth })
  const entityParamsProvider = (entityParams) => {
    if (entityParams.x !== undefined && entityParams.y !== undefined) {
      return {
        ...entityParams,
        ...toScreenCoords(entityParams),
      }
    }
    return entityParams
  }
  entitiesLoader(registerEntity, $config, entityParamsProvider)(mapsDefinitions.first)
}
