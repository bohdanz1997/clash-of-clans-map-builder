import { detectHit } from '@app/services'
import * as c from '@app/components'
import * as n from '@app/nodes'

export default () => ({
  nodes: [n.SourceHovered],

  update(node) {
    const { client, entity } = node

    // -> IDLE
    const out = !detectHit(client.entity, entity)
    if (out) {
      client.entity.remove(c.Interact.Source)
      entity.remove(c.Interact.Client)
      entity.remove(c.Hovered)

      client.entity.add(c.Idle)
      entity.add(c.Idle)

      return
    }

    // -> CLICKED
    const pointerContext = client.entity.get(c.PointerContext)
    if (pointerContext.isDown) {
      entity.remove(c.Hovered)
      entity.add(c.Clicked)
    }
  },
})
