import { useNodes, onNodeAdded, onUpdate } from 'core/ecs'
import { detectHit } from '../../services'
import { states } from '../../fsm'
import * as c from '../../components'
import * as n from '../../nodes'

export const IdleState = ({ log }) => {
  useNodes([n.InitiatorIdle, n.TargetIdle])

  onNodeAdded(() => {
    log('idle')
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
