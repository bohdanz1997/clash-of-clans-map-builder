import { Point } from 'core/pixi'
import { hitTestRect } from 'core/collision'
import { createEnhancedSystem } from 'core/factories'
import { nDraggable, nPointer } from '../nodes'
import displayGroups from '../renderLayers'
import priorities from './priorities'

const moveToArrEnd = (item, arr) => {
  arr.splice(arr.indexOf(item), 1)
  arr.push(item)
}

const findHitDragNodeByPointer = (draggableNode, pointer) => (
  draggableNode.find(({ display, collision }) => hitTestRect(collision.bounds, pointer.cartPosition))
)

// manages drag & drop functionality
export default ($engine, $config) => createEnhancedSystem({
  update(draggableNode, pointerNode) {
    pointerNode.each(({ pointer: cPointer }) => {
      const { pointer } = cPointer
      const foundDragNode = findHitDragNodeByPointer(draggableNode, pointer)

      if (pointer.isDown) {
        if (cPointer.dragTarget === null) {
          if (foundDragNode) {
            cPointer.dragTarget = foundDragNode
            this.startDrag(cPointer)
          }
        } else {
          this.moveDraggableWithPointer(cPointer)
        }
      }

      if (pointer.isUp) {
        if (cPointer.dragTarget !== null) {
          this.endDrag(cPointer)
        }
      }

      // Change the mouse arrow pointer to a hand if it's over a
      // draggable sprite
      if (foundDragNode) {
        if (pointer.visible) {
          pointer.cursor = 'pointer'
        }
      } else if (pointer.visible) {
        pointer.cursor = 'auto'
      }
    })
  },

  startDrag(cPointer) {
    const { pointer, dragTarget } = cPointer
    const { display } = dragTarget

    // Calculate the difference between the pointer's
    // position and the sprite's position
    const { cartPosition } = pointer
    const offset = cartPosition.sub(dragTarget.position.pos)
    cPointer.dragOffset.copy(offset)

    // set higher render priority via setting drag group
    display.oldGroup = display.group
    display.group = displayGroups.DRAG

    // display selected sprite above all the others
    moveToArrEnd(display.sprite, display.sprite.parent.children)
  },

  endDrag(cPointer) {
    const { display } = cPointer.dragTarget
    display.group = display.oldGroup
    cPointer.dragTarget = null
  },

  moveDraggableWithPointer(cPointer) {
    const { pointer, dragOffset, dragTarget } = cPointer
    const newPos = Point.sub(
      pointer.cartPosition.floorNum($config.cartCellSize),
      dragOffset.floorNum($config.cartCellSize),
    )

    dragTarget.position.pos.copy(newPos)
  },
})(nDraggable, nPointer)($engine)

export const params = {
  priority: priorities.MOVEMENT,
}
