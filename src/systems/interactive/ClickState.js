import * as c from '../../components'
import * as n from '../../nodes'

/**
 * @param {TileMap} map
 * @param {Helper} helper
 */
export const ClickState = ({ map, helper }) => ({
  nodes: [n.TargetClicked],

  update(node) {
    const { initiator, entity, position } = node

    // -> DRAGGING
    if (entity.has(c.Draggable)) {
      const clientPosition = initiator.entity.get(c.IsoPosition)
      const { startPos, offset } = helper.prepareDrag(clientPosition, position)

      entity.remove(c.Clicked)
      entity.add(c.Dragging)
      entity.add(c.DragContext({ startPos, offset }))

      return
    }

    const pointerContext = initiator.entity.get(c.PointerContext)

    // -> HOVERED
    if (pointerContext.isUp) {
      entity.remove(c.Clicked)
      entity.add(c.Hovered)
    }
  },
})
