import { detectHit } from '../../services'
import * as c from '../../components'
import * as n from '../../nodes'

export const HoverState = () => ({
  nodes: [n.TargetHovered],

  update(node) {
    const { initiator, entity } = node

    // -> IDLE
    const out = !detectHit(initiator.entity, entity)
    if (out) {
      initiator.entity.remove(c.Interact.Target)
      entity.remove(c.Interact.Initiator)
      entity.remove(c.Hovered)

      initiator.entity.add(c.Idle)
      entity.add(c.Idle)

      return
    }

    // -> CLICKED
    const pointerContext = initiator.entity.get(c.PointerContext)
    if (pointerContext.isDown) {
      entity.remove(c.Hovered)
      entity.add(c.Clicked)
    }
  },
})
