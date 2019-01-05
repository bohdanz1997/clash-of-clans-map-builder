import * as n from '../nodes'

export default () => ({
  nodes: [n.IsoRender],

  update({ isoPosition, display }) {
    display.sprite.x = isoPosition.x
    display.sprite.y = isoPosition.y
  },
})
