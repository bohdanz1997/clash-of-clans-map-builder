import { system, nodeEachTwice } from 'core/scent'
import { createDnD } from '../services'
import * as n from '../nodes'

/**
 * @param {Engine} $engine
 * @param $config
 * @param {EntityFactory} $entityFactory
 */
export default (
  $engine,
  $config,
  $entityFactory,
) => {
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

  system({
    init(nDeckItems, nPointers) {
      addListeners(nPointers, nDeckItems)
    },
  })(n.DeckItem, n.Pointer)($engine)
}

export const params = {
  enabled: true,
}
