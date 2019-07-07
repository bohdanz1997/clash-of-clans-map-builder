import { useNodes, onNodeAdded, onUpdate } from 'core/ecs'
import { detectHit, detectHitUI } from '../../services'
import { states } from '../../fsm'
import * as c from '../../components'
import * as n from '../../nodes'
import { levels } from '../../config'

export const IdleState = ({ log }) => {
  useNodes([n.InitiatorIdle, n.TargetIdle])

  onNodeAdded(() => {
    log(levels.interact, 'idle')
  }, n.TargetIdle)

  onUpdate((initiatorNode, targetNode) => {
    initiatorNode.each((nInitiator) => {
      targetNode.each((nTarget) => {
        const eInitiator = nInitiator.entity
        const eTarget = nTarget.entity

        if (detectHit(eInitiator, eTarget)) {
          nInitiator.fsm.fsm.changeState(states.interacts, { entity: eTarget })
          nTarget.fsm.fsm.changeState(states.hovered, { entity: eInitiator })
        }
      })
    })
  })
}

export const UIIdleState = ({ log }) => {
  useNodes([n.InitiatorIdle, n.UITargetIdle])

  onNodeAdded(() => {
    log(levels.interact, 'ui idle')
  }, n.UITargetIdle)

  onUpdate((initiators, uiTargets) => {
    initiators.each((initiator) => {
      uiTargets.each((target) => {
        const eInitiator = initiator.entity
        const eTarget = target.entity

        if (detectHitUI(eInitiator, eTarget)) {
          initiator.fsm.fsm.changeState(states.interacts, { entity: eTarget })
          target.fsm.fsm.changeState(states.hovered, { entity: eInitiator })
        }
      })
    })
  })
}
