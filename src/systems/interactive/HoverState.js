import { useNodes, onNodeAdded, onUpdate } from 'core/ecs'
import { detectHit } from '../../services'
import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'

export const HoverState = ({ log }) => {
  useNodes([n.TargetHovered])

  onNodeAdded(() => {
    log('hover')
  })

  onUpdate((node) => {
    const { initiator, fsm, entity } = node

    if (!detectHit(initiator.entity, entity)) {
      initiator.entity.get(c.FSM).fsm.changeState(states.idle)
      fsm.fsm.changeState(states.idle)
      return
    }

    const pointerContext = initiator.entity.get(c.PointerContext)
    if (pointerContext.justDown) {
      fsm.fsm.changeState(states.clicked)
    }
  })
}
