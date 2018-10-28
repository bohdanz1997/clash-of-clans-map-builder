// @flow
import type { GameConfig, Engine } from 'types/game'

import { createEnhancedSystem } from 'core/factories'
import { Point } from 'core/pixi'
import priorities from './priorities'
import { nCameraControl, nPointer } from '../nodes'

export default ($config: GameConfig, $engine: Engine) => {
  let origDragPoint = null

  return createEnhancedSystem({
    update(cameraNode, pointerNode) {
      const {
        motion,
      } = cameraNode.head

      const {
        pointer,
      } = pointerNode.head

      if (pointer.pointer.isDown && pointer.dragTarget === null) {
        if (origDragPoint) {
          const diff = Point.sub(origDragPoint, pointer.pointer.position)
          motion.vel.copy(diff)
        }

        origDragPoint = pointer.pointer.position.clone()
      } else {
        origDragPoint = null
      }
    },
  })(nCameraControl, nPointer)($engine)
}

export const params = {
  priority: priorities.MOVEMENT,
}
