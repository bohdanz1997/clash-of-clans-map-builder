// @flow
import type { Engine } from '../types/game'
import type { Application } from '../types/pixi'

import { createSystem } from '../core/factories'
import { nPointer } from '../nodes'
import { spriteUtils } from '../services'

export default ($engine: Engine, $app: Application) => {

  const text = spriteUtils.text(null, '12px sans', 'white')

  createSystem({
    init() {
      $app.stage.addChild(text)
    },

    update(node) {
      const { pointer } = node.pointer
      const { position, fieldPosition, cartPosition } = pointer

      text.content = `
        x: ${position.x}
        y: ${position.y}
        cartX: ${Math.floor(cartPosition.x)}
        cartY: ${Math.floor(cartPosition.y)}
        column: ${fieldPosition.x}
        row: ${fieldPosition.y}
      `
    },
  })(nPointer)($engine)
}

export const params = {
  enabled: true,
}
