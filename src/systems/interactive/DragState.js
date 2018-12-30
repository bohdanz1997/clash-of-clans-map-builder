import { Point } from 'core'
import * as c from '@app/components'
import * as n from '@app/nodes'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 */
export default ({ engine, map }) => ({
  nodes: [n.DragObserver],

  init(nodes) {
    nodes.onAdded(() => console.log('drag start'))

    this.cellSize = map.config.cellWidth
  },

  updateDrag(node) {
    const { client, source, dragContext } = node
    const pointer = client.entity.get(c.Pointer)
    const sourcePosition = source.entity.get(c.Position)

    const nextPos = Point.sub(
      pointer.input.cartPosition.floorNum(this.cellSize),
      dragContext.offset.floorNum(this.cellSize)
    )

    sourcePosition.pos.copy(nextPos)
  },

  update(node) {
    const { client, entity } = node
    const pointer = client.entity.get(c.Pointer)

    this.updateDrag(node)

    // -> DROP
    if (pointer.input.isUp) {
      entity.remove(c.Dragging)
      entity.add(c.Dropped)
    }
  },
})
