import { detectHit } from '../../services'
import { states } from '../../fsm-states'
import * as c from '../../components'
import * as n from '../../nodes'

export const IdleState = ({ log }) => ({
  nodes: [n.InitiatorIdle, n.TargetIdle],

  init(initiators, targets) {
    targets.onAdded(() => {
      log('idle')
    })
  },

  update(initiatorNode, targetNode) {
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
  },
})
