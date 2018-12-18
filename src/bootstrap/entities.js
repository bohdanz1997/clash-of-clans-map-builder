import { flatArr } from 'core/util'
import {
  createMapParser,
  createEntityBuilder,
} from 'core'

import { appConfig, gameConfig } from '../config'
import { generateGroundLayer } from '../services'

const toScreenCords = ({ x, y }) => ({
  x: x * gameConfig.game.cartCellSize,
  y: y * gameConfig.game.cartCellSize,
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

export default (engine, deps) => {
  const {
    mapDefinitions,
    entityFactories,
    entityDefinitions,
  } = appConfig

  const mapSize = {
    width: gameConfig.game.widthInCells,
    height: gameConfig.game.heightInCells,
  }

  const initEntitiesFromLayer = layer => (
    mapParser.parseLayer(layer.data)
  )

  const mapParser = createMapParser({
    entityDefinitions,
  })

  const entityBuilder = createEntityBuilder({
    deps,
    entityFactories,
    entityParamsProvider,
  })

  const mapDef = mapDefinitions.first
  const layers = [generateGroundLayer(gameConfig.game), ...mapDef.layers]

  const entitiesParams = layers.map(initEntitiesFromLayer)
  const gameMapParams = { ...mapParser.parseMapDefinition(mapDef), ...mapSize }
  const allParams = flatArr(...entitiesParams, [gameMapParams])

  const entities = allParams.map(entityBuilder)
  entities.forEach(engine.addEntity)
}
