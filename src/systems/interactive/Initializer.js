import * as c from '../../components'
import * as n from '../../nodes'
import { states, initTargetFSM, initInitiatorFSM } from '../../fsm'

const setInitialState = (cFsm) => {
  if (cFsm.setInitial) {
    cFsm.setInitial(cFsm.fsm)
  } else {
    cFsm.fsm.changeState(states.idle)
  }
}

export const InteractiveInitializer = () => ({
  nodes: [n.Initiator, n.Target],

  init(initiators, targets) {
    const setupInitiator = (node) => {
      const { fsm } = node

      initInitiatorFSM(fsm.fsm)
      setInitialState(fsm)
    }

    const setupTarget = (node) => {
      const { fsm } = node

      initTargetFSM(node.fsm.fsm)
      setInitialState(fsm)
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
