import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm/states'

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

      return
    }

    const pointerContext = initiator.entity.get(c.PointerContext)
    if (pointerContext.isUp) {
      fsm.fsm.changeState(states.hovered)
    }
  },
})
