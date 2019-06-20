import * as n from '../nodes'

export const Debug = () => ({
  nodes: [n.Pointer, n.Hud],

  update(pointerNode, hudNode) {
    const { display } = hudNode.head
    const { context, position, isoPosition } = pointerNode.head

    display.sprite.content = `
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
