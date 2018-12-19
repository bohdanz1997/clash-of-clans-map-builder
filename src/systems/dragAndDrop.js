import { hitTest } from 'core/collision'
import { createEnhancedSystem } from 'core/factories'
import { gameConfig } from '../config'
import { createDnD } from '../services'
import { DraggableNode, PointerNode, MapNode } from '../nodes'

const findHitDragNodeByPointer = (draggableNode, pointer) => (
  draggableNode.find(({ collision }) => hitTest.rect(collision.bounds, pointer.cartPosition))
)

export default ($engine, $config) => {
  let buildingLayer
  const dndManager = createDnD({ cellSize: $config.cartCellSize })

  createEnhancedSystem({
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
              dndManager.start(cPointer, foundDragNode.entityRef)
            }
          } else {
            dndManager.move(cPointer)
          }
        }

        if (pointer.isUp) {
          if (cPointer.dragTarget !== null) {
            dndManager.end(cPointer)
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
  })(DraggableNode, PointerNode, MapNode)($engine)
}

export const params = {
  priority: gameConfig.priorities.MOVEMENT,
}
