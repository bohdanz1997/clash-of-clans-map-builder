import { Point } from 'core/pixi'
import { hitTest } from 'core/collision'
import { createEnhancedSystem } from 'core/factories'
import { viewConfig, gameConfig } from '../config'
import { nDraggable, nPointer, nMap } from '../nodes'
import * as c from '../components'

const { groups } = viewConfig

const findHitDragNodeByPointer = (draggableNode, pointer) => (
  draggableNode.find(({ collision }) => hitTest.rect(collision.bounds, pointer.cartPosition))
)

export default ($engine, $config) => {
  let buildingLayer

  return createEnhancedSystem({
    init(draggableNode, pointerNode, mapNode) {
      const { map } = mapNode.head
      buildingLayer = map.gameField.getLayer('building')
    },

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
      const { display, draggable, position } = dragTarget

      // store target position
      draggable.prevPos = position.pos.clone()

      // Calculate the difference between the pointer's
      // position and the sprite's position
      const { cartPosition } = pointer
      const offset = cartPosition.sub(position.pos)
      cPointer.dragOffset.copy(offset)

      // set higher render priority via setting drag group
      display.oldGroup = display.group
      display.group = groups.DRAG

      // TODO: use FSM
      dragTarget.entityRef.remove(c.cBuildingLayer)
      dragTarget.entityRef.add(c.cDragLayer)
    },

    endDrag(cPointer) {
      const { dragTarget } = cPointer
      const { display, draggable, position, collision } = dragTarget

      display.group = display.oldGroup

      if (!buildingLayer.isEmptyInSize(position.fieldPos.x, position.fieldPos.y, collision.sizeInCells)) {
        position.pos.copy(draggable.prevPos)
      }

      dragTarget.entityRef.remove(c.cDragLayer)
      dragTarget.entityRef.add(c.cBuildingLayer)
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
  })(nDraggable, nPointer, nMap)($engine)
}

export const params = {
  priority: gameConfig.priorities.MOVEMENT,
}
