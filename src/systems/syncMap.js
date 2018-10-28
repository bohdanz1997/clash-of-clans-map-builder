import { createEnhancedSystem } from 'core/factories'
import { Layer } from 'core/tools'
import { Point } from 'core/pixi'
import { nMap, nMapLayers } from '../nodes'

export default ($engine, $config) => {
  const updateNodeForLayer = layer => (node) => {
    const { position, identity } = node
    const normPos = Point.floor(Point.divNum(position.pos, $config.cartCellSize))
    const id = layer.getIn(normPos.x, normPos.y)

    if (id === Layer.EMPTY_CELL) {
      layer.setIn(normPos.x, normPos.y, identity.id)
    }
  }

  let buildingLayer
  let dragLayer

  return createEnhancedSystem({
    init(mapNode) {
      const { gameField } = mapNode.head.map

      buildingLayer = gameField.getLayer('building')
      dragLayer = gameField.getLayer('drag')
    },

    update(mapNode, buildingNode, dragNode) {
      buildingLayer.clear()
      dragLayer.clear()

      buildingNode.each(updateNodeForLayer(buildingLayer))
      dragNode.each(updateNodeForLayer(dragLayer))
    },
  })(nMap, nMapLayers.Building, nMapLayers.Drag)($engine)
}

export const params = {
  enabled: true,
}
