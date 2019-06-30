import { useNodes, onUpdate } from 'core/ecs'
import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'

export const DropState = () => {
  useNodes([n.TargetDropped])

  onUpdate((node) => {
    const { fsm, entity } = node

    fsm.fsm.changeState(states.hovered)

    entity.remove(c.Layer.Drag)
    entity.add(c.Layer.Building)
  })
}

export const UIDropState = () => {
  useNodes([n.UITargetDropped])

  onUpdate((node) => {
    const { fsm, entity } = node

    fsm.fsm.changeState(states.hovered)

    entity.remove(c.Layer.UIDrag)
    entity.add(c.Layer.UI)
  })
}
