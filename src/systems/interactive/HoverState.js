import { detectHit } from '../../services'
import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm-states'

export const HoverState = ({ log }) => ({
  nodes: [n.TargetHovered],

  init(nodes) {
    nodes.onAdded(() => {
      log('hover')
    })
  },

  update(node) {
    const { initiator, fsm, entity } = node

    if (!detectHit(initiator.entity, entity)) {
      initiator.entity.get(c.FSM).fsm.changeState(states.idle)
      fsm.fsm.changeState(states.idle)
      return
    }

    const pointerContext = initiator.entity.get(c.PointerContext)
    if (pointerContext.isDown) {
      fsm.fsm.changeState(states.clicked)
    }
  },
})
