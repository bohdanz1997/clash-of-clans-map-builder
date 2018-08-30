import { createEnhancedSystem } from '../core/factories'
import { Layer } from '../core/tools'
import { nMap, nBuilding } from '../nodes'

const getMapLayer = (layerName, mapNode) => (
  mapNode.map.gameField.getLayer(layerName)
)

const getNormalizedPos = (node) => (
  node.position.pos.normalize()
)

const updateLayerCell = (layer, pos) => {
	layer.setIn(pos.x, pos.y, Layer.cellState.BUSY)
}

const updateBuildingNode = layer => (node) => {
  const normPos = getNormalizedPos(node)
  updateLayerCell(layer, normPos)
}

const handler = (mapNode, buildingNode) => {
  const layer = getMapLayer('buildings', mapNode.head)
  layer.clear()

  buildingNode.each(updateBuildingNode(layer))
  console.log(layer.toString())
}

export default createEnhancedSystem(handler)(nMap, nBuilding)
