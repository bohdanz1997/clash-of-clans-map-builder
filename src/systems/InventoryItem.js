import { useNodes, onUpdate } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'
import { Preview } from '../entities'

/**
 * @param {EntityManager} entities
 * @param {Helper} helper
 */
export const SelectInventoryItem = ({ entities, helper }) => {
  useNodes([n.Pointer, n.InventoryItemClicked, n.InventoryItemSelected])

  const addPointerPreview = (clickedItemNode, pointerNode) => {
    const { initiator, entityMeta } = clickedItemNode
    const initiatorIsoPosition = initiator.entity.get(c.IsoPosition)
    const { startPos, offset } = helper.prepareFollow(initiatorIsoPosition.cartX, initiatorIsoPosition.cartY)

    const previewEntity = entities.add(Preview, {
      def: entityMeta.def,
      x: startPos.x,
      y: startPos.y,
    })

    previewEntity.add(c.Parent({
      entity: pointerNode.entity,
      offset,
      childType: c.Child.Preview,
    }))

    removeOldPreview(pointerNode)
    pointerNode.entity.add(c.Child.Preview({
      entity: previewEntity,
      offset,
    }))
  }

  const removeOldPreview = (pointerNode) => {
    const oldPreview = pointerNode.entity.get(c.Child.Preview)
    if (oldPreview) {
      pointerNode.entity.remove(c.Child.Preview)
      oldPreview.entity.dispose()
    }
  }

  onUpdate((pointerNodes, clickedNodes, selectedNodes) => {
    if (!pointerNodes.size || !clickedNodes.size) {
      return
    }

    const pointerNode = pointerNodes.head
    const clickedItemNode = clickedNodes.head
    const selectedItemNode = selectedNodes.head

    if (selectedItemNode) {
      if (selectedItemNode.entity === clickedItemNode.entity) {
        return
      }
      selectedItemNode.entity.remove(c.Selected)
    }

    clickedItemNode.entity.add(c.Selected)

    addPointerPreview(clickedItemNode, pointerNode)
  })
}

/**
 * @param {EntityManager} entities
 * @param {Helper} helper
 * @param {TileMap} map
 */
export const PutEntityToMap = ({ entities, helper, map }) => {
  useNodes([n.PointerIdle, n.InventoryItemSelected])

  const buildingLayer = map.getLayer('building')

  const createEntity = (startPos, entityMeta) => {
    entities.add(entityMeta.id, {
      def: entityMeta.def,
      x: startPos.x,
      y: startPos.y,
    })

    entityMeta.count -= 1
  }

  const canAddEntityToMap = (pos, meta) => {
    const mapPos = helper.toMapCoords(pos.x, pos.y)
    const definition = entities.getDefinition(meta.def)
    return buildingLayer.isEmptyInSize(mapPos.x, mapPos.y, definition.radius)
  }

  onUpdate((pointerNodes, selectedNodes) => {
    pointerNodes.each((pointerNode) => {
      if (pointerNode.context.justDown) {
        selectedNodes.each((selectedItem) => {
          const { isoPosition } = pointerNode
          const startPos = helper.normToCenter(isoPosition.cartX, isoPosition.cartY)

          if (canAddEntityToMap(startPos, selectedItem.entityMeta)) {
            createEntity(startPos, selectedItem.entityMeta)
          }
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
