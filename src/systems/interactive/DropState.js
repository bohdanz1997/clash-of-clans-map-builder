import * as c from '../../components'
import * as n from '../../nodes'

export const DropState = () => ({
  nodes: [n.TargetDropped],

  update(node) {
    const { display, entity } = node

    // -> HOVER
    entity.remove(c.Dropped)
    entity.remove(c.DragContext)
    entity.add(c.Hovered)

    display.group = display.oldGroup

    entity.remove(c.DragLayer)
    entity.add(c.BuildingLayer)
  },
})
