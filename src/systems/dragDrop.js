import { Point } from 'core/pixi'
import { system } from 'core/scent'
import { hitTest } from 'core/collision'

import * as c from '../components'
import {
  InteractiveNode,
  PointerNode,
  HoverObserverNode, DragObserverNode,
} from '../nodes'

const detectHit = (nInteractive, pointerInput) => {
  const { collision, entity } = nInteractive
  const isIso = entity.has(c.cIsoPosition)
  const pointerPos = isIso
    ? pointerInput.cartPosition
    : pointerInput.position

  return hitTest.rect(collision.bounds, pointerPos)
}

export default ($engine, $config, $entityFactory) => {
  const observersMap = new Map()
  const cellSize = $config.cartCellSize

  system('interactSystem', {
    update(interactiveNodes, pointerNodes) {
      pointerNodes.each((pointerNode) => {
        interactiveNodes.each((interactiveNode) => {
          const hit = detectHit(interactiveNode, pointerNode.pointer.input)
          const mixedId = `${interactiveNode.identity.seed}${pointerNode.identity.seed}`

          if (hit && !observersMap.has(mixedId)) {
            const eObserver = $entityFactory.create('observer', {
              client: pointerNode.entity,
              source: interactiveNode.entity,
            })

            eObserver.add(c.cHovered)
            $engine.addEntity(eObserver)
            observersMap.set(mixedId, eObserver)
          }

          if (!hit && observersMap.has(mixedId)) {
            const eObserver = observersMap.get(mixedId)
            eObserver.dispose()
            observersMap.delete(mixedId)
          }
        })
      })
    },
  })(InteractiveNode, PointerNode)($engine)

  system('hover observer system', {
    init(nodes) {
      nodes.onAdded(() => {
        console.log('hover start')
      })
      nodes.onRemoved(() => {
        console.log('hover end')
      })
    },

    update(node) {
      const { client, entity } = node
      const pointer = client.entity.get(c.cPointer)

      if (pointer.input.isDown) {
        if (!entity.has(c.cDragging)) {
          entity.add(c.cDragging)
          entity.add(c.cDragContext)
        }
      }

      if (pointer.input.isUp) {
        if (entity.has(c.cDragging)) {
          entity.remove(c.cDragging)
          entity.remove(c.cDragContext)
        }
      }
    },
  })(HoverObserverNode)($engine)

  system('dragging observer system', {
    init(nodes) {
      nodes.onAdded((node) => {
        const {
          entity,
          client,
          source,
        } = node

        const sourcePos = source.entity.get(c.cPosition).pos
        const startPos = sourcePos.clone()
        const pointer = client.entity.get(c.cPointer)
        const offsetFromClient = pointer.input.cartPosition.sub(sourcePos)

        const dragContext = entity.get(c.cDragContext)
        dragContext.startPos = startPos
        dragContext.offsetFromClient = offsetFromClient
        console.log('drag start')
      })

      nodes.onRemoved((node) => {
        const { entity, source, dragContext } = node

        const [
          position,
          collision,
        ] = source.entity.getMany(
          c.cPosition,
          c.cCollision,
        )

        // if (!map.isEmptyInSize(position.fieldPos.x, position.fieldPos.y, collision.radius)) {
        //   position.pos.copy(dragContext.startPos)
        // }

        entity.remove(c.cDragContext)
        console.log('drag end')
      })
    },

    update(node) {
      const { client, source, dragContext } = node
      const clientPointer = client.entity.get(c.cPointer)
      const sourcePosition = source.entity.get(c.cPosition)

      const nextPos = Point.sub(
        clientPointer.input.cartPosition.floorNum(cellSize),
        dragContext.offsetFromClient.floorNum(cellSize)
      )

      sourcePosition.pos.copy(nextPos)
    },
  })(DragObserverNode)($engine)

  system('pointerHoverSystem', {
    init(nodes) {
      nodes.onAdded((node) => {
        const ePointer = node.client.entity
        ePointer.get(c.cPointer).input.hoverOver = true
      })
      nodes.onRemoved((node) => {
        const ePointer = node.client.entity
        ePointer.get(c.cPointer).input.hoverOver = false
      })
    },
  })(HoverObserverNode)($engine)
}
