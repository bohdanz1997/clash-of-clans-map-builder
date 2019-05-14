import * as c from 'app/components'
import * as n from 'app/nodes'

/**
 * @param {TileMap} map
 * @param {Helper} helper
 */
export default ({ map, helper }) => ({
  nodes: [n.SourceClicked],

  update(node) {
    const { client, entity, position } = node

    // -> DRAGGING
    if (entity.has(c.Draggable)) {
      const clientPosition = client.entity.get(c.IsoPosition)
      const { startPos, offset } = helper.prepareDrag(clientPosition, position)

      entity.remove(c.Clicked)
      entity.add(c.Dragging)
      entity.add(c.DragContext({ startPos, offset }))

      return
    }

    const pointerContext = client.entity.get(c.PointerContext)

    // -> HOVERED
    if (pointerContext.isUp) {
      entity.remove(c.Clicked)
      entity.add(c.Hovered)
    }
  },
})
