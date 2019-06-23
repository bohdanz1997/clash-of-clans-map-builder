import * as c from '../components'
import * as n from '../nodes'
import { states } from '../fsm/states'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 * @param {EntityManager} entities
 * @param {Helper} helper
 */
export const AddEntityFromInventoryItem = ({ engine, map, entities, helper }) => ({
  nodes: [n.InventoryItemClicked],

  init(nodes) {
    nodes.onAdded((node) => {
      const { entityMeta, initiator } = node
      const clientPosition = initiator.entity.get(c.IsoPosition)

      const entity = entities.add(entityMeta.id, {
        def: entityMeta.def,
        x: clientPosition.cartX,
        y: clientPosition.cartY,
      })

      entityMeta.count -= 1

      const entityPosition = entity.get(c.Position)
      const { startPos, offset } = helper.prepareDrag(clientPosition, entityPosition)

      entity.get(c.FSM).setInitial = (fsm) => {
        fsm.changeState(states.dragging, {
          startPos,
          offset,
          entity: initiator.entity,
        })
      }
    })
  },
})

export const DisposeInventoryItem = () => ({
  nodes: [n.InventoryItem],

  update(node) {
    const { entityMeta, entity } = node

    if (entityMeta.count <= 0) {
      entity.dispose()
    }
  },
})

export const InventoryItemCounter = () => ({
  nodes: [n.InventoryItemCounter],

  update(node) {
    const { parent, display } = node
    // because parent entity can be disposed
    const inventoryMeta = parent.entity.get(c.EntityMeta, true)
    display.sprite.content = inventoryMeta.count
  },
})
