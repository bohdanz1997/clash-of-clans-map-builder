// @flow
import type { GameConfig, Engine } from 'types/game'

import { createEnhancedSystem } from 'core/scent'
import { Point } from 'core/pixi'
import { gameConfig } from '../config'
import { CameraControlNode, PointerNode } from '../nodes'

const pointIn = range => (point) => {
  let x = Math.min(point.x, range)
  x = Math.max(x, -range)

  let y = Math.min(point.y, range)
  y = Math.max(y, -range)

  return Point.of(x, y)
}

export default ($config: GameConfig, $engine: Engine) => {
  let origDragPoint = null
  const maxScrollSpeed = 30
  const pointInRange = pointIn(maxScrollSpeed)

  return createEnhancedSystem({
    update(nCamera, nPointer) {
      const {
        motion,
      } = nCamera.head

      const {
        pointer,
        dragSource,
      } = nPointer.head

      if (pointer.input.isDown && dragSource.target === null) {
        if (origDragPoint) {
          const diff = Point.sub(origDragPoint, pointer.input.position)
          const corrected = pointInRange(diff)
          motion.vel.copy(corrected)
        }

        origDragPoint = pointer.input.position.clone()
      } else {
        origDragPoint = null
      }
    },
  })(CameraControlNode, PointerNode)($engine)
}

export const params = {
  enabled: true,
  priority: gameConfig.priorities.MOVEMENT,
}
