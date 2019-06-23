import * as c from '../../components'
import * as n from '../../nodes'
import { states, initTargetFSM, initInitiatorFSM } from '../../fsm'

export const InteractiveInitializer = () => ({
  nodes: [n.Initiator, n.Target],

  init(initiators, targets) {
    const setupInitiator = (node) => {
      const { fsm } = node

      initInitiatorFSM(fsm.fsm)
      if (fsm.setInitial) {
        fsm.setInitial(fsm.fsm)
      } else {
        fsm.fsm.changeState(states.idle)
      }
    }

    const setupTarget = (node) => {
      const { fsm } = node

      initTargetFSM(node.fsm.fsm)
      if (fsm.setInitial) {
        fsm.setInitial(fsm.fsm)
      } else {
        fsm.fsm.changeState(states.idle)
      }
    }

    const removeState = (node) => {
      // node.fsm.changeState(states.initial)
    }

    initiators.each(setupInitiator)
    initiators.onAdded(setupInitiator)
    initiators.onRemoved(removeState)

    targets.each(setupTarget)
    targets.onAdded(setupTarget)
    targets.onRemoved(removeState)
  },
})
