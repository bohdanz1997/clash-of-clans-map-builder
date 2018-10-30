import {
  mapParser,
  jsModuleLoader,
  jsonModuleLoader,
} from 'core'

import { generateGroundLayer } from '../services'
import { stringifyJSON } from '../util'

const createEntityBuilder = (deps, entitiesFactories) => {
  return (entityParams) => {
    const { id } = entityParams
    if (id === undefined) {
      throw new Error(`Entity params must include 'id', got params: \n${stringifyJSON(entityParams)}`)
    }

    const entityFactory = entitiesFactories[id]
    if (!entityFactory) {
      throw new Error(`Could not find entity factory for id '${id}'`)
    }

    return entityFactory(entityParams, deps)
  }
}

const entitiesFactories = jsModuleLoader(require.context('../entities'))
const mapsDefinitions = jsonModuleLoader(require.context('assets/map'))
const entitiesDefinitions = jsonModuleLoader(require.context('assets/entity'))

const createEntitiesLoader = ({ entityBuilder, gameConfig, entityParamsProvider }) => (mapData) => {
  const builtEntities = []

  const initEntitiesFromLayer = (layer) => {
    const entitiesData = mapParser.parseLayer(layer.data, entitiesDefinitions)
    entitiesData.forEach((entityParams) => {
      const changedEntityParams = entityParamsProvider(entityParams)
      builtEntities.push(entityBuilder(changedEntityParams))
    })
  }

  mapData.layers.unshift(generateGroundLayer(gameConfig))
  mapData.layers.forEach(initEntitiesFromLayer)

  const mapEntityParams = mapParser.parseMapDefinition(mapData, entitiesDefinitions)
  const changedMapEntityParams = entityParamsProvider(mapEntityParams)
  builtEntities.push(entityBuilder(changedMapEntityParams))

  return builtEntities
}

// ****************************************
// TODO: move to another place
const toScreenCords = ({ x, y }, $config) => ({
  x: x * $config.cartCellSize,
  y: y * $config.cartCellSize,
})

const entityParamsProvider = (entityParams) => {
  if (entityParams.x !== undefined && entityParams.y !== undefined) {
    return {
      ...entityParams,
      ...toScreenCords(entityParams),
    }
  }
  return entityParams
}
// ****************************************

export default (config) => {
  const {
    deps,
    gameConfig,
    entityParamsProvider,
  } = config

  const entityBuilder = createEntityBuilder(deps, entitiesFactories)

  return (mapDefinition) => (
    createEntitiesLoader({
      entityBuilder,
      gameConfig,
      entityParamsProvider,
    })(mapDefinition)
  )
}
