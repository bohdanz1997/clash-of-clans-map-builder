import { useNodes, onNodeAdded, onNodeRemoved } from 'core/ecs'
import * as c from '../../components'
import * as n from '../../nodes'
import { states, initTargetFSM, initInitiatorFSM } from '../../fsm'

const setInitialState = (cFsm) => {
  cFsm.fsm.changeState(states.idle)
}

export const InteractiveInitializer = () => {
  useNodes([n.Initiator, n.Target, n.UITarget])

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

  const setupUITarget = (node) => {
    const { fsm } = node

    initTargetFSM(node.fsm.fsm)
    setInitialState(fsm)
  }

  const removeState = (node) => {
    // node.fsm.changeState(states.initial)
  }

  onNodeAdded(setupInitiator, n.Initiator)
  onNodeRemoved(removeState, n.Initiator)

  onNodeAdded(setupTarget, n.Target)
  onNodeRemoved(removeState, n.Target)

  onNodeAdded(setupUITarget, n.UITarget)
  onNodeRemoved(removeState, n.UITarget)
}
