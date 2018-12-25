import { Engine, system, nodeEachTwice } from 'core/scent'
import { TileMap } from 'core/tilemap'
import { createDnD } from '../services'
import * as n from '../nodes'

/**
 * @param {Object} args
 * @param {Engine} args.engine
 * @param {TileMap} args.map
 * @param {EntityFactory} args.entityFactory
 */
export const DeckManager = ({ engine, map, entityFactory }) => {
  const dndManager = createDnD({ cellSize: map.config.cellWidth })

  const makeEntityFromDeck = (entityMeta, position) => (
    entityFactory.create(entityMeta.id, {
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

    engine.addEntity(entity)
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

  return system({
    init(nDeckItems, nPointers) {
      addListeners(nPointers, nDeckItems)
    },
  })(n.DeckItem, n.Pointer)(engine)
}

export const params = {
  enabled: true,
}
