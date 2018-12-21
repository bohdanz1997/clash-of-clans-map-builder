import { hitTest } from 'core/collision'
import { createEnhancedSystem } from 'core/scent'
import { gameConfig } from '../config'
import { createDnD } from '../services'
import * as c from '../components'
import * as n from '../nodes'

const findHitDragNode = (draggableNode, position) => (
  draggableNode.find(({ collision }) => (
    hitTest.rect(collision.bounds, position)
  ))
)

export default ($engine, $config) => {
  let map
  let dndManager

  const handleDrop = (entity) => {
    const position = entity.get(c.Position)
    const collision = entity.get(c.Collision)
    const draggable = entity.get(c.Draggable)

    if (!map.isEmptyInSize(position.fieldPos.x, position.fieldPos.y, collision.radius)) {
      position.pos.copy(draggable.startPos)
    }
  }

  createEnhancedSystem({
    init(draggableNode, pointerNode, mapNode) {
      map = mapNode.head.map.gameField.getLayer('building')
      dndManager = createDnD({
        cellSize: $config.cartCellSize,
        onDrop: handleDrop,
      })
    },

    update(draggableNode, pointerNode) {
      pointerNode.each((nPointer) => {
        const { pointer } = nPointer
        const foundDragNode = findHitDragNode(
          draggableNode,
          pointer.input.cartPosition
        )

        if (pointer.input.isDown) {
          if (foundDragNode) {
            dndManager.start(nPointer, foundDragNode.entity)
          }
          dndManager.move(nPointer)
        }

        if (pointer.input.isUp) {
          dndManager.end(nPointer)
        }
      })
    },
  })(n.Draggable, n.Pointer, n.Map)($engine)
}

export const params = {
  enabled: false,
  priority: gameConfig.priorities.MOVEMENT,
}
