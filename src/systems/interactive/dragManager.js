import {
  Point,
  system,
} from 'core'

import * as c from '../../components'
import * as n from '../../nodes'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 */
export const DragManager = ({ engine, map }) => {
  const cellSize = map.config.cellWidth

  return system({
    updateDrag(eClient, eSource, dragging) {
      const pointer = eClient.get(c.Pointer)
      const sourcePosition = eSource.get(c.Position)

      const nextPos = Point.sub(
        pointer.input.cartPosition.floorNum(cellSize),
        dragging.offset.floorNum(cellSize)
      )

      sourcePosition.pos.copy(nextPos)
    },

    init(nodes) {
      nodes.onAdded(() => console.log('drag start'))
      nodes.onRemoved(() => console.log('drag end'))
    },

    update(node) {
      const { client, source, dragging, entity } = node
      const pointer = client.entity.get(c.Pointer)

      this.updateDrag(client.entity, source.entity, dragging)

      if (pointer.input.isUp) {
        entity.remove(c.Dragging)
        entity.add(c.Hovered)
      }
    },
  })(n.DragObserver)(engine)
}
