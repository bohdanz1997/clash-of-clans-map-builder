import { useNodes, onNodeAdded, onUpdate } from 'core/ecs'
import { detectHit, detectHitUI } from '../../services'
import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'
import { levels } from '../../config'

export const HoverState = ({ log }) => {
  useNodes([n.TargetHovered])

  onNodeAdded(() => {
    log(levels.interact, 'hover')
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

export const UIHoverState = ({ log }) => {
  useNodes([n.UITargetHovered])

  onNodeAdded(() => {
    log(levels.interact, 'ui hover')
  })

  onUpdate((node) => {
    const { initiator, fsm, entity } = node

    if (!detectHitUI(initiator.entity, entity)) {
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
