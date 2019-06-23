import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm-states'

export const DropState = () => ({
  nodes: [n.TargetDropped],

  update(node) {
    const { display, fsm, entity } = node

    fsm.fsm.changeState(states.hovered)

    display.group = display.oldGroup

    entity.remove(c.DragLayer)
    entity.add(c.BuildingLayer)
  },
})
