import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm-states'

const initInitiatorFSM = (fsm) => {
  const interactTargetCallback = ({ entity }) => c.Interact.Target({ entity })

  fsm.createState(states.idle)
    .add(c.Idle)
  fsm.createState(states.interacts)
    .add(c.Interact.Target).withCallback(interactTargetCallback)
}

const initTargetFSM = (fsm) => {
  const interactInitiatorCallback = ({ entity }) => c.Interact.Initiator({ entity })
  const dragContextCallback = ({ startPos, offset }) => c.DragContext({ startPos, offset })

  fsm.createState(states.idle)
    .add(c.Idle)
  fsm.createState(states.hovered)
    .add(c.Interact.Initiator).withCallback(interactInitiatorCallback)
    .add(c.Hovered)
  fsm.createState(states.clicked)
    .add(c.Interact.Initiator).withCallback(interactInitiatorCallback)
    .add(c.Clicked)
  fsm.createState(states.dragging)
    .add(c.Interact.Initiator).withCallback(interactInitiatorCallback)
    .add(c.DragContext).withCallback(dragContextCallback)
    .add(c.Dragging)
  fsm.createState(states.dropped)
    .add(c.Interact.Initiator).withCallback(interactInitiatorCallback)
    .add(c.DragContext).withCallback(dragContextCallback)
    .add(c.Dropped)
}

export const InteractiveInitializer = () => ({
  nodes: [n.Initiator, n.Target],

  init(initiators, targets) {
    const setupInitiator = (node) => {
      initInitiatorFSM(node.fsm.fsm)
      node.fsm.fsm.changeState(states.idle)
    }

    const setupTarget = (node) => {
      initTargetFSM(node.fsm.fsm)
      node.fsm.fsm.changeState(states.idle)
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
