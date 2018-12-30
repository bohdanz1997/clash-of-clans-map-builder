import { detectHit } from '@app/services'
import * as c from '@app/components'
import * as n from '@app/nodes'
import * as config from '@app/config'

const { groups } = config.display

export default () => ({
  nodes: [n.HoverObserver],

  init(nodes) {
    nodes.onAdded(() => console.log('hover start'))
    nodes.onRemoved(() => console.log('hover end'))
  },

  update(node) {
    const { client, source, entity } = node

    // -> IDLE
    const out = !detectHit(client.entity, source.entity)
    if (out) {
      client.entity.add(c.Idle)
      source.entity.add(c.Idle)

      entity.dispose()
      return
    }

    // -> DRAGGING
    const pointer = client.entity.get(c.Pointer)
    if (pointer.input.isDown) {
      const sourcePosition = source.entity.get(c.Position)
      const startPos = sourcePosition.pos.clone()
      const offset = pointer.input.cartPosition.sub(startPos)

      entity.remove(c.Hovered)
      entity.add(c.Dragging)
      entity.add(c.DragContext({ startPos, offset }))

      const display = source.entity.get(c.Display)
      display.oldGroup = display.group
      display.group = groups.DRAG

      source.entity.remove(c.BuildingLayer)
      source.entity.add(c.DragLayer)
    }
  },
})
