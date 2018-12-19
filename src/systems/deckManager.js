import { createEnhancedSystem } from 'core/factories'
import * as c from '../components'
import { createDnD } from '../services'
import { DeckNode, DeckItemNode, PointerNode } from '../nodes'

export default ($engine, $entityFactory, $config) => {
  const dndManager = createDnD({ cellSize: $config.cartCellSize })

  createEnhancedSystem({
    init(deckNode, deckItemNode, pointerNode) {
      const { pointer: cPointer } = pointerNode.head

      deckItemNode.each((node) => {
        const { entityMeta, interactive } = node
        interactive.press = () => {
          const entity = $entityFactory.create({
            id: entityMeta.id,
          })
          const cPosition = entity.get(c.cPosition)
          cPosition.pos.copy(cPointer.pointer.cartPosition)

          $engine.addEntity(entity)

          dndManager.start(cPointer, entity)
        }
      })
    },

    update(deckNode, deckItemNode, pointerNode) {

    },
  })(DeckNode, DeckItemNode, PointerNode)($engine)
}

export const params = {
  enabled: true,
}
