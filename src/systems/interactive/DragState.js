import * as c from '@app/components'
import * as n from '@app/nodes'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 */
export default ({ engine, map }) => ({
  nodes: [n.DragObserver],

  init() {
    this.cellSize = map.config.cellWidth
  },

  updateDrag(node) {
    const { client, source, dragContext } = node
    const clientPosition = client.entity.get(c.IsoPosition)
    const sourcePosition = source.entity.get(c.Position)

    const clientX = clientPosition.col * this.cellSize
    const clientY = clientPosition.row * this.cellSize

    sourcePosition.x = clientX - dragContext.offset.x
    sourcePosition.y = clientY - dragContext.offset.y

    sourcePosition.pos.set(sourcePosition.x, sourcePosition.y)
  },

  update(node) {
    const { client, entity } = node
    const pointerContext = client.entity.get(c.PointerContext)

    this.updateDrag(node)

    // -> DROP
    if (pointerContext.isUp) {
      entity.remove(c.Dragging)
      entity.add(c.Dropped)
    }
  },
})
