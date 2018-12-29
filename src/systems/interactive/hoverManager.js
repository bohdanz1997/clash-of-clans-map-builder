import { system } from 'core'

import { detectHit } from '../../services'
import * as c from '../../components'
import * as n from '../../nodes'

/**
 * @param {Engine} engine
 */
export const HoverManager = ({ engine }) => system({
  init(nodes) {
    nodes.onAdded(() => console.log('hover start'))
    nodes.onRemoved(() => console.log('hover end'))
  },

  update(node) {
    const { client, source, entity } = node
    const eClient = client.entity
    const eSource = source.entity
    const out = !detectHit(eClient, eSource)

    if (out) {
      eClient.add(c.Idle)
      eSource.add(c.Idle)
      entity.dispose()
      return
    }

    const pointer = eClient.get(c.Pointer)

    if (pointer.input.isDown) {
      const sourcePosition = eSource.get(c.Position)
      const startPos = sourcePosition.pos.clone()
      const offset = pointer.input.cartPosition.sub(startPos)

      entity.remove(c.Hovered)
      entity.add(c.Dragging({ startPos, offset }))
    }
  },
})(n.HoverObserver)(engine)
