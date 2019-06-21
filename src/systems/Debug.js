import * as n from '../nodes'

export const Debug = () => ({
  nodes: [n.Pointer, n.Hud],

  update(pointerNode, hudNode) {
    if (!pointerNode.head) {
      return
    }
    const { context, position, isoPosition } = pointerNode.head

    hudNode.head.display.sprite.content = `
      x: ${position.x}
      y: ${position.y}
      cartX: ${Math.floor(isoPosition.cartX)}
      cartY: ${Math.floor(isoPosition.cartY)}
      column: ${isoPosition.col}
      row: ${isoPosition.row}
      hover: ${context.hovered}
    `
  },
})
