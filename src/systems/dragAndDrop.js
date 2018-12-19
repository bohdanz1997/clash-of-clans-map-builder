import { hitTest } from 'core/collision'
import { createEnhancedSystem } from 'core/scent'
import { gameConfig } from '../config'
import { createDnD } from '../services'
import { DraggableNode, PointerNode, MapNode } from '../nodes'

const findHitDragNodeByPointer = (draggableNode, position) => (
  draggableNode.find(({ collision }) => (
    hitTest.rect(collision.bounds, position)
  ))
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
      pointerNode.each((nPointer) => {
        const { pointer } = nPointer
        const foundDragNode = findHitDragNodeByPointer(
          draggableNode,
          pointer.input.cartPosition
        )

        if (pointer.input.isDown) {
          if (foundDragNode) {
            dndManager.start(nPointer, foundDragNode.entityRef)
          }
          dndManager.move(nPointer)
        }

        if (pointer.input.isUp) {
          dndManager.end(nPointer)
        }
      })
    },
  })(DraggableNode, PointerNode, MapNode)($engine)
}

export const params = {
  priority: gameConfig.priorities.MOVEMENT,
}
