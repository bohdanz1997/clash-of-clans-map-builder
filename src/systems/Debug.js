import * as c from '../components'
import * as n from '../nodes'
import * as e from '../entities'

export const Debug = ({ entities }) => ({
  nodes: [n.Pointer, n.Debug, n.InventoryItemSelected],

  init() {
    entities.add(e.Debug)
  },

  update(pointerNode, debugNode, selectedNode) {
    const pointer = pointerNode.head
    if (!pointer) {
      return
    }
    const { position, isoPosition, entity } = pointer

    let selectedInfo = 'none'
    if (selectedNode.head) {
      const { entityMeta } = selectedNode.head
      selectedInfo = `${entityMeta.id} (${entityMeta.def})`
    }

    let targetInfo = 'none'
    if (pointer.entity.has(c.Interact.Target)) {
      const target = pointer.entity.get(c.Interact.Target).entity
      const targetPos = target.get(c.Position)
      targetInfo = `
        x: ${Math.floor(targetPos.x)}
        y: ${Math.floor(targetPos.y)}
        col: ${targetPos.col}
        row: ${targetPos.row}
      `
    }

    debugNode.head.display.sprite.content = `
      x: ${position.x}
      y: ${position.y}
      cartX: ${Math.floor(isoPosition.cartX)}
      cartY: ${Math.floor(isoPosition.cartY)}
      column: ${isoPosition.col}
      row: ${isoPosition.row}
      hover: ${entity.has(c.Hovered)}
      selected: ${selectedInfo}
      target: ${targetInfo}
    `
  },
})
