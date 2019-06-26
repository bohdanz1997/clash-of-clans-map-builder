import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'

export const DropState = () => ({
  nodes: [n.TargetDropped],

  update(node) {
    const { fsm, entity } = node

    fsm.fsm.changeState(states.hovered)

    entity.remove(c.Layer.Drag)
    entity.add(c.Layer.Building)
  },
})
