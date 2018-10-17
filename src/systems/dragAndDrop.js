import { createEnhancedSystem } from '../core/factories'
import { nDraggable, nPointer } from '../nodes'
import { hitTestRect } from '../core/hitTest'
import { Point } from '../core/pixi'

const moveToArrEnd = (item, arr) => {
  arr.splice(arr.indexOf(item), 1)
  arr.push(item)
}

const findHitDragNodeByPointer = (draggableNode, pointer) => (
  draggableNode.find(({ display, collision }) => hitTestRect(collision.bounds, pointer.cartPosition))
)

// manages drag & drop functionality
export default ($engine, $config) => createEnhancedSystem({
  init() {
    this.floorCellPos = point => point
      .divNum($config.cellWidth)
      .floor()
      .multNum($config.cellWidth)
  },

  update(draggableNode, pointerNode) {
    pointerNode.each(({ pointer: cPointer }) => {
      const { pointer } = cPointer
      const foundDragNode = findHitDragNodeByPointer(draggableNode, pointer)

      if (pointer.isDown) {
        if (cPointer.dragTarget === null) {
          if (foundDragNode) {
            cPointer.dragTarget = foundDragNode
            this.setUpDragForSprite(cPointer)
          }
        } else {
          this.moveDraggableWithPointer(cPointer)
        }
      }

      if (pointer.isUp) {
        cPointer.dragTarget = null
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

  setUpDragForSprite(cPointer) {
    const { pointer, dragTarget } = cPointer
    const { display: { sprite } } = dragTarget

    // Calculate the difference between the pointer's
    // position and the sprite's position
    const { cartPosition } = pointer
    const offset = cartPosition.sub(dragTarget.position.pos)
    cPointer.dragOffset.copy(offset)

    // display selected sprite above all the others
    moveToArrEnd(sprite, sprite.parent.children)
  },

  moveDraggableWithPointer(cPointer) {
    const { pointer, dragOffset, dragTarget } = cPointer
    const newPos = this.floorCellPos(Point.sub(pointer.cartPosition, dragOffset))

    dragTarget.position.pos.copy(newPos)
  },
})(nDraggable, nPointer)($engine)
