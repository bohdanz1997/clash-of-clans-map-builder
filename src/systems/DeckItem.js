import { Tween, Ease } from 'core'
import * as c from '../components'
import * as n from '../nodes'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 * @param {EntityManager} entities
 * @param {Helper} helper
 */
export const InteractWithDeckItem = ({ engine, map, entities, helper }) => ({
  nodes: [n.DeckItemClicked],

  init(nodes) {
    nodes.onAdded((node) => {
      const { entityMeta, initiator } = node
      const clientPosition = initiator.entity.get(c.IsoPosition)

      const entity = entities.add(entityMeta.id, {
        def: entityMeta.def,
        x: clientPosition.cartX,
        y: clientPosition.cartY,
      })

      entity.add(c.Tween(new Tween({
        obj: entity.get(c.Display).sprite,
        prop: 'alpha',
        startVal: 1,
        endVal: 0.5,
        type: Ease.SINE,
        yoyo: true,
      })))

      entityMeta.count -= 1

      const entityPosition = entity.get(c.Position)
      const { startPos, offset } = helper.prepareDrag(clientPosition, entityPosition)

      entity.add(c.Dragging)
      entity.add(c.DragContext({ startPos, offset }))
      entity.add(c.Interact.Initiator({ entity: initiator.entity }))
    })
  },
})

export const TrackDeckItemCount = () => ({
  nodes: [n.DeckItem],

  update(node) {
    const { entityMeta, entity } = node

    if (entityMeta.count <= 0) {
      entity.dispose()
    }
  },
})
