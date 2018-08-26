import { createEnhancedSystem } from '../core/factories'
import { nMap, nBuilding } from '../nodes'

const onUpdate = ([mapNode, buildingNode]) => {
  const { gameField } = mapNode.head.map
  const layer = gameField.getLayer('buildings')
  layer.clear()

  buildingNode.each(({ position }) => {
    const pos = position.pos.normalize()
    layer.setIn(pos.x, pos.y, 'BUSY')
  })
  console.log(layer.toString())
}

export default engine => createEnhancedSystem({
  onUpdate,
})(engine, [nMap, nBuilding])
