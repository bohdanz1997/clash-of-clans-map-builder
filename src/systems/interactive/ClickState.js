import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'

/**
 * @param {TileMap} map
 * @param {Helper} helper
 * @param log
 */
export const ClickState = ({ map, helper, log }) => ({
  nodes: [n.TargetClicked],

  init(nodes) {
    nodes.onAdded(() => {
      log('click')
    })
  },

  update(node) {
    const { initiator, fsm, entity, position } = node

    if (entity.has(c.Draggable)) {
      const clientPosition = initiator.entity.get(c.IsoPosition)
      const { startPos, offset } = helper.prepareDrag(clientPosition, position)

      fsm.fsm.changeState(states.dragging, {
        startPos,
        offset,
      })
    } else if (entity.has(c.Selectable)) {
      fsm.fsm.changeState(states.selected)
    } else {
      const pointerContext = initiator.entity.get(c.PointerContext)
      if (pointerContext.isUp) {
        fsm.fsm.changeState(states.hovered)
      }
    }
  },
})
