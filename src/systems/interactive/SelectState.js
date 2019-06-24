import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'

/**
 * @param log
 */
export const SelectState = ({ log }) => ({
  nodes: [n.TargetSelected],

  init(nodes) {
    nodes.onAdded(() => {
      log('select')
    })
  },

  update(node) {
    const { initiator, fsm } = node
    const pointerContext = initiator.entity.get(c.PointerContext)

    if (pointerContext.justDown) {
      fsm.fsm.changeState(states.hovered)
    }
  },
})
