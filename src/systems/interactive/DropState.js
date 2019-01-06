import * as c from '@app/components'
import * as n from '@app/nodes'

export default () => ({
  nodes: [n.SourceDropped],

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
