import { createEnhancedSystem } from '../core/factories'
import { Layer } from '../core/tools'
import { Point } from '../core/pixi'
import { nMap, nBuilding } from '../nodes'

const getMapLayer = (layerName, mapNode) => (
  mapNode.map.gameField.getLayer(layerName)
)

export default ($engine, $config) => {
  const updateNodeForLayer = layer => ({ position }) => {
    const normPos = Point.floor(Point.divNum(position.pos, $config.cartCellSize))
    layer.setIn(normPos.x, normPos.y, Layer.cellState.BUSY)
  }

  return createEnhancedSystem({
    init(mapNode) {
      this.buildingLayer = getMapLayer('building', mapNode.head)
    },

    update(mapNode, buildingNode) {
      this.buildingLayer.clear()

      buildingNode.each(updateNodeForLayer(this.buildingLayer))
    },
  })(nMap, nBuilding)($engine)
}

export const params = {
  enabled: true,
}
