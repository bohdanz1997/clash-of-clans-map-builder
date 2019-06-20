import * as n from '../nodes'

export const IsometricRender = () => ({
  nodes: [n.IsoRender],

  update({ isoPosition, display }) {
    display.sprite.x = isoPosition.x
    display.sprite.y = isoPosition.y
  },
})
