import { system } from 'core/scent'
import * as n from '../nodes'

export const Debug = ({ engine }) => {
  return system({
    update(pointerNode, hudNode) {
      const { display } = hudNode.head
      const { pointer } = pointerNode.head
      const { position, fieldPosition, cartPosition } = pointer.input

      display.sprite.content = `
        x: ${position.x}
        y: ${position.y}
        cartX: ${Math.floor(cartPosition.x)}
        cartY: ${Math.floor(cartPosition.y)}
        column: ${fieldPosition.x}
        row: ${fieldPosition.y}
        hover: ${pointer.input.hoverOver}
      `
    },
  })(n.Pointer, n.Hud)(engine)
}
