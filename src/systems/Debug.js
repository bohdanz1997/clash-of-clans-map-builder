import * as n from '../nodes'

export default () => ({
  nodes: [n.Pointer, n.Hud],

  update(pointerNode, hudNode) {
    const { display } = hudNode.head
    const { pointer } = pointerNode.head
    const p = pointer.input

    display.sprite.content = `
        x: ${p.position.x}
        y: ${p.position.y}
        cartX: ${Math.floor(p.cartPosition.x)}
        cartY: ${Math.floor(p.cartPosition.y)}
        column: ${p.fieldPosition.x}
        row: ${p.fieldPosition.y}
        hover: ${p.hoverOver}
        ${p.elapsedTime}
      `
  },
})
