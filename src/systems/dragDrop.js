import { Point } from 'core/pixi'
import { system } from 'core/scent'
import { hitTest } from 'core/collision'

import * as c from '../components'
import * as n from '../nodes'

const detectHit = (nInteractive, pointerInput) => {
  const { collision, entity } = nInteractive
  const isIso = entity.has(c.IsoPosition)
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

            eObserver.add(c.Hovered)
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
  })(n.Interactive, n.Pointer)($engine)

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
      const pointer = client.entity.get(c.Pointer)

      if (pointer.input.isDown) {
        if (!entity.has(c.Dragging)) {
          entity.add(c.Dragging)
          entity.add(c.DragContext)
        }
      }

      if (pointer.input.isUp) {
        if (entity.has(c.Dragging)) {
          entity.remove(c.Dragging)
          entity.remove(c.DragContext)
        }
      }
    },
  })(n.HoverObserver)($engine)

  system('dragging observer system', {
    init(nodes) {
      nodes.onAdded((node) => {
        const {
          entity,
          client,
          source,
        } = node

        const sourcePos = source.entity.get(c.Position).pos
        const startPos = sourcePos.clone()
        const pointer = client.entity.get(c.Pointer)
        const offsetFromClient = pointer.input.cartPosition.sub(sourcePos)

        const dragContext = entity.get(c.DragContext)
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
          c.Position,
          c.Collision,
        )

        // if (!map.isEmptyInSize(position.fieldPos.x, position.fieldPos.y, collision.radius)) {
        //   position.pos.copy(dragContext.startPos)
        // }

        entity.remove(c.DragContext)
        console.log('drag end')
      })
    },

    update(node) {
      const { client, source, dragContext } = node
      const clientPointer = client.entity.get(c.Pointer)
      const sourcePosition = source.entity.get(c.Position)

      const nextPos = Point.sub(
        clientPointer.input.cartPosition.floorNum(cellSize),
        dragContext.offsetFromClient.floorNum(cellSize)
      )

      sourcePosition.pos.copy(nextPos)
    },
  })(n.DragObserver)($engine)

  system('pointerHoverSystem', {
    init(nodes) {
      nodes.onAdded((node) => {
        const ePointer = node.client.entity
        ePointer.get(c.Pointer).input.hoverOver = true
      })
      nodes.onRemoved((node) => {
        const ePointer = node.client.entity
        ePointer.get(c.Pointer).input.hoverOver = false
      })
    },
  })(n.HoverObserver)($engine)
}
