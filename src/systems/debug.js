// @flow
import type { Engine } from 'types/game'

import { createEnhancedSystem } from 'core/scent'
import { HudNode, PointerNode } from '../nodes'

export default ($engine: Engine) => {
  createEnhancedSystem({
    update(pointerNode, hudNode) {
      const { display } = hudNode.head
      const { pointer } = pointerNode.head.pointer
      const { position, fieldPosition, cartPosition } = pointer

      display.sprite.content = `
        x: ${position.x}
        y: ${position.y}
        cartX: ${Math.floor(cartPosition.x)}
        cartY: ${Math.floor(cartPosition.y)}
        column: ${fieldPosition.x}
        row: ${fieldPosition.y}
      `
    },
  })(PointerNode, HudNode)($engine)
}

export const params = {
  enabled: true,
}
