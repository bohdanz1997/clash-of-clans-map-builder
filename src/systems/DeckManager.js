import { nodeEachTwice } from 'core/scent'
import { createDnD } from '../services'
import * as n from '../nodes'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 * @param {EntityManager} entities
 */
export default ({ engine, map, entities }) => ({
  nodes: [n.DeckItem, n.Pointer],

  makeEntityFromDeck(entityMeta, position) {
    return entities.create(entityMeta.id, {
      def: entityMeta.def,
      x: position.x,
      y: position.y,
    })
  },

  initEntityAndDragging(nPointer, nDeckItem) {
    const entity = this.makeEntityFromDeck(
      nDeckItem.entityMeta,
      nPointer.pointer.input.cartPosition
    )

    engine.addEntity(entity)
    this.dndManager.start(nPointer, entity)
  },

  addListeners: nodeEachTwice((nPointer, nDeckItem) => {
    const { interactive } = nDeckItem
    const { dragSource } = nPointer

    interactive.press = () => {
      if (!dragSource.target) {
        this.initEntityAndDragging(nPointer, nDeckItem)
      }
    }
  }),

  init(nDeckItems, nPointers) {
    this.dndManager = createDnD({ cellSize: map.config.cellWidth })

    this.addListeners(nPointers, nDeckItems)
  },
})
