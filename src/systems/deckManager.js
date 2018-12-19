import { createEnhancedSystem } from 'core/scent'
import * as c from '../components'
import { createDnD } from '../services'
import { DeckNode, DeckItemNode, PointerNode } from '../nodes'

export default ($engine, $entityFactory, $config) => {
  const dndManager = createDnD({ cellSize: $config.cartCellSize })

  createEnhancedSystem({
    init(nDeck, nDeckItem, nPointer) {
      const { pointer: cPointer } = nPointer.head

      nDeckItem.each((node) => {
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
  })(DeckNode, DeckItemNode, PointerNode)($engine)
}

export const params = {
  enabled: true,
}
