import * as c from '../components'
import { states } from './states'

export const initInitiatorFSM = (fsm) => {
  const interactTargetCallback = ({ entity }) => c.Interact.Target({ entity })

  fsm.createState(states.idle)
    .add(c.Idle)
  fsm.createState(states.interacts)
    .add(c.Interact.Target).withCallback(interactTargetCallback)
    .add(c.Hovered)
}

export const initTargetFSM = (fsm) => {
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
