import * as c from '../components'
import * as n from '../nodes'

export const Debug = () => ({
  nodes: [n.Pointer, n.Hud, n.InventoryItemSelected],

  update(pointerNode, hudNode, selectedNode) {
    if (!pointerNode.head) {
      return
    }
    const { position, isoPosition, entity } = pointerNode.head

    let selectedInfo = 'none'
    if (selectedNode.head) {
      const { entityMeta } = selectedNode.head
      selectedInfo = `${entityMeta.id} (${entityMeta.def})`
    }

    hudNode.head.display.sprite.content = `
      x: ${position.x}
      y: ${position.y}
      cartX: ${Math.floor(isoPosition.cartX)}
      cartY: ${Math.floor(isoPosition.cartY)}
      column: ${isoPosition.col}
      row: ${isoPosition.row}
      hover: ${entity.has(c.Hovered)}
      selected: ${selectedInfo}
    `
  },
})
