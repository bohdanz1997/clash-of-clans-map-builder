import { createEnhancedSystem } from '../core/factories'
import { Layer } from '../core/tools'
import { nMap, nBuilding } from '../nodes'

const onUpdate = ([mapNode, buildingNode]) => {
  const { gameField } = mapNode.head.map
  const layer = gameField.getLayer('buildings')
  layer.clear()

  buildingNode.each(({ position }) => {
    const pos = position.pos.normalize()
    layer.setIn(pos.x, pos.y, Layer.cellState.BUSY)
  })
  console.log(layer.toString())
}

export default engine => createEnhancedSystem({
  onUpdate,
})(engine, [nMap, nBuilding])
