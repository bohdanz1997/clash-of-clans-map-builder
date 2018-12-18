import { createEnhancedSystem } from 'core/factories'
import { nDeck, nDeckItem, nPointer } from '../nodes'

export default ($engine, $entityFactory) => {
  createEnhancedSystem({
    init(deckNode, deckItemNode) {
      deckItemNode.each((node) => {
        const { entityMeta, interactive } = node
        interactive.press = () => {
          const entity = $entityFactory.create({
            id: entityMeta.id,
          })
          $engine.addEntity(entity)
        }
      })
    },

    update(deckNode, deckItemNode, pointerNode) {

    },
  })(nDeck, nDeckItem, nPointer)($engine)
}

export const params = {
  enabled: true,
}
