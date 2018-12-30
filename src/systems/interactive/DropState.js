import * as c from '@app/components'
import * as n from '@app/nodes'

export default () => ({
  nodes: [n.DropObserver],

  update(node) {
    const { source, entity } = node

    // -> HOVER
    entity.remove(c.Dropped)
    entity.add(c.Hovered)

    const display = source.entity.get(c.Display)
    display.group = display.oldGroup

    source.entity.remove(c.DragLayer)
    source.entity.add(c.BuildingLayer)
  },
})
