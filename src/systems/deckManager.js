import { createEnhancedSystem } from 'core/scent'
import { createDnD } from '../services'
import { DeckNode, DeckItemNode, PointerNode } from '../nodes'

export default ($engine, $entityFactory, $config) => {
  const dndManager = createDnD({ cellSize: $config.cartCellSize })

  createEnhancedSystem({
    init(nDeck, nDeckItem, nPointer) {
      const { pointer } = nPointer.head

      nDeckItem.each((node) => {
        const { entityMeta, interactive } = node
        interactive.press = () => {
          const pos = pointer.input.cartPosition
          const entity = $entityFactory.create(entityMeta.id, {
            def: entityMeta.def,
            x: pos.x,
            y: pos.y,
          })

          $engine.addEntity(entity)

          dndManager.start(nPointer.head, entity)
        }
      })
    },
  })(DeckNode, DeckItemNode, PointerNode)($engine)
}

export const params = {
  enabled: true,
}
