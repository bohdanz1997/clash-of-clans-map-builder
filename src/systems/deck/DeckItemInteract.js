import { Tween, Ease } from 'core'
import * as c from '@app/components'
import * as n from '@app/nodes'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 * @param {EntityManager} entities
 * @param {Helper} helper
 */
export default ({ engine, map, entities, helper }) => ({
  nodes: [n.DeckClicked],

  init(nodes) {
    nodes.onAdded((node) => {
      const { entityMeta, client } = node
      const clientPosition = client.entity.get(c.IsoPosition)

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
      entity.add(c.Interact.Client({ entity: client.entity }))
    })
  },
})
