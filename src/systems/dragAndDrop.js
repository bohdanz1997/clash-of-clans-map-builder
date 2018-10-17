import { createEnhancedSystem } from '../core/factories'
import { nDraggable, nPointer } from '../nodes'
import { hitTestRect } from '../core/hitTest'

const moveToArrEnd = (item, arr) => {
  arr.splice(arr.indexOf(item), 1)
  arr.push(item)
}

const findHitDragNodeByPointer = (draggableNode, pointer) => (
  draggableNode.find(({ display, collision }) => hitTestRect(collision.bounds, pointer.cartPosition))
)

// manages drag & drop functionality
export default $engine => createEnhancedSystem({
  init() {
    this.dragNode = null
  },

  update(draggableNode, pointerNode) {
    pointerNode.each(({ pointer: { pointer } }) => {
      const foundDragNode = findHitDragNodeByPointer(draggableNode, pointer)

      if (pointer.isDown) {
        if (this.dragNode === null) {
          if (foundDragNode) {
            this.dragNode = foundDragNode
            this.setUpDragForSprite(foundDragNode, pointer)
          }
        } else {
          this.moveDraggableWithPointer(pointer)
        }
      }

      if (pointer.isUp) {
        this.dragNode = null
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

  setUpDragForSprite(foundDragNode, pointer) {
    const {
      display: { sprite },
      position,
    } = foundDragNode

    // Calculate the difference between the pointer's
    // position and the sprite's position
    const { cartPosition } = pointer
    const offset = cartPosition.sub(position.pos)
    pointer.dragOffsetX = offset.x
    pointer.dragOffsetY = offset.y

    // display selected sprite above all the others
    moveToArrEnd(sprite, sprite.parent.children)
  },

  moveDraggableWithPointer(pointer) {
    const { position } = this.dragNode
    const { cartPosition } = pointer

    position.pos.set(
      cartPosition.x - pointer.dragOffsetX,
      cartPosition.y - pointer.dragOffsetY,
    )
  },
})(nDraggable, nPointer)($engine)
