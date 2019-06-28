import { useNodes, onUpdate } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'
import { Preview } from '../entities'

/**
 * @param {EntityManager} entities
 * @param {Helper} helper
 */
export const SelectInventoryItem = ({ entities, helper }) => {
  useNodes([n.InventoryItemClicked, n.InventoryItemSelected, n.Pointer])

  onUpdate((clickedNodes, selectedNodes, pointerNodes) => {
    const pointerNode = pointerNodes.head

    clickedNodes.each((clickedNode) => {
      selectedNodes.each((selectedNode) => {
        selectedNode.entity.remove(c.Selected)
      })

      const { initiator, entityMeta, entity } = clickedNode
      const initiatorIsoPosition = initiator.entity.get(c.IsoPosition)
      const { startPos, offset } = helper.prepareFollow(initiatorIsoPosition.cartX, initiatorIsoPosition.cartY)

      entity.add(c.Selected)

      const ePreview = entities.add(Preview, {
        def: entityMeta.def,
        x: startPos.x,
        y: startPos.y,
      })

      pointerNode.entity.add(c.Child.Preview({
        entity: ePreview,
        offset,
      }))
    })
  })
}

/**
 * @param {EntityManager} entities
 * @param {Helper} helper
 */
export const PutEntityToMap = ({ entities, helper }) => {
  useNodes([n.Pointer, n.InventoryItemSelected])

  const createEntity = (isoPosition, entityMeta) => {
    const startPos = helper.normToCenter(isoPosition.cartX, isoPosition.cartY)

    entities.add(entityMeta.id, {
      def: entityMeta.def,
      x: startPos.x,
      y: startPos.y,
    })

    entityMeta.count -= 1
  }

  onUpdate((pointerNodes, itemNodes) => {
    pointerNodes.each((pointerNode) => {
      if (pointerNode.context.justDown) {
        itemNodes.each((itemNode) => {
          createEntity(pointerNode.isoPosition, itemNode.entityMeta)
        })
      }
    })
  })
}

export const DisposeInventoryItemAndPreview = () => {
  useNodes([n.InventoryItem, n.Preview])

  const removePreviews = (nodes) => {
    nodes.each((node) => {
      node.entity.dispose()
    })
  }

  onUpdate((itemNodes, previewNodes) => {
    itemNodes.each(({ entityMeta, entity }) => {
      if (entityMeta.count <= 0) {
        entity.dispose()
        removePreviews(previewNodes)
      }
    })
  })
}

export const InventoryItemCounter = () => {
  useNodes([n.InventoryItemCounter])

  onUpdate((node) => {
    const { parent, display } = node
    // because parent entity can be disposed
    const inventoryMeta = parent.entity.get(c.EntityMeta, true)
    display.sprite.text = inventoryMeta.count
  })
}
