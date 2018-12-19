import { createEnhancedSystem, nodeEachTwice } from 'core/scent'
import { createDnD } from '../services'
import { DeckNode, DeckItemNode, PointerNode } from '../nodes'

export default ($engine, $entityFactory, $config) => {
  const dndManager = createDnD({ cellSize: $config.cartCellSize })

  const makeEntityFromDeck = (entityMeta, position) => (
    $entityFactory.create(entityMeta.id, {
      def: entityMeta.def,
      x: position.x,
      y: position.y,
    })
  )

  const initEntityAndDragging = (nPointer, nDeckItem) => {
    const entity = makeEntityFromDeck(
      nDeckItem.entityMeta,
      nPointer.pointer.input.cartPosition
    )

    $engine.addEntity(entity)
    dndManager.start(nPointer, entity)
  }

  const addListeners = nodeEachTwice((nPointer, nDeckItem) => {
    const { interactive } = nDeckItem
    const { dragSource } = nPointer

    interactive.press = () => {
      if (!dragSource.target) {
        initEntityAndDragging(nPointer, nDeckItem)
      }
    }
  })

  createEnhancedSystem({
    init(nDecks, nDeckItems, nPointers) {
      addListeners(nPointers, nDeckItems)
    },
  })(DeckNode, DeckItemNode, PointerNode)($engine)
}

export const params = {
  enabled: true,
}
