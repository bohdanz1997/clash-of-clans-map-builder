import { EntityStateMachine } from '../core/fsm'
import { createEntity } from '../core/scent'
import * as c from './components'
import { states } from './fsm-states'
import { Point } from '../core/pixi'

const initiator = createEntity()
const target = createEntity()
const fsm = new EntityStateMachine(target)

const interactInitiatorCallback = ({ entity }) => c.Interact.Initiator({ entity })
const dragContextCallback = ({ startPos, offset }) => c.DragContext({ startPos, offset })

fsm.createState(states.initial)
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

fsm.changeState(states.idle)
fsm.changeState(states.hovered, { entity: initiator })
fsm.changeState(states.clicked)
fsm.changeState(states.dragging, {
  startPos: new Point(10, 10),
  offset: new Point(10, 10),
})
fsm.changeState(states.dropped)
fsm.changeState(states.hovered)
fsm.changeState(states.idle)

console.log(target)
