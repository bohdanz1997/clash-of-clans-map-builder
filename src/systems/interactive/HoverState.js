import { Point } from 'core'
import { detectHit } from '@app/services'
import * as c from '@app/components'
import * as n from '@app/nodes'
import * as config from '@app/config'

const { groups } = config.display

export default ({ map }) => ({
  nodes: [n.HoverObserver],

  init() {
    this.cellSize = map.config.cellWidth
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
    const pointerContext = client.entity.get(c.PointerContext)
    if (pointerContext.isDown) {
      const clientPosition = client.entity.get(c.IsoPosition)
      const sourcePosition = source.entity.get(c.Position)
      const startX = sourcePosition.x
      const startY = sourcePosition.y

      const offset = {
        x: this.normCoord(clientPosition.cartX - startX),
        y: this.normCoord(clientPosition.cartY - startY),
      }

      entity.remove(c.Hovered)
      entity.add(c.Dragging)
      entity.add(c.DragContext({ startPos: new Point(startX, startY), offset }))

      const display = source.entity.get(c.Display)
      display.oldGroup = display.group
      display.group = groups.DRAG

      source.entity.remove(c.BuildingLayer)
      source.entity.add(c.DragLayer)
    }
  },

  normCoord(val) {
    return Math.floor(val / this.cellSize) * this.cellSize
  },
})
