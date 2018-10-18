// @flow
import type { Engine } from '../types/game'
import type { Application } from '../types/pixi'

import { createSystem } from '../core/factories'
import { nPointer } from '../nodes'
import { spriteUtils } from '../services'

export default ($engine: Engine, $app: Application) => {

  const text = spriteUtils.text()

  createSystem({
    init() {
      $app.stage.addChild(text)
    },

    update(node) {
      const { pointer } = node.pointer
      const { position, fieldPosition, isUp, isDown } = pointer

      text.content = `
        x: ${position.x}
        y: ${position.y}
        column: ${fieldPosition.x}
        row: ${fieldPosition.y}
        isUp: ${isUp}
        isDown: ${isDown}
      `
    },
  })(nPointer)($engine)
}

export const params = {
  enabled: true,
}
