import * as n from '../nodes'

export default () => ({
  nodes: [n.IsoRender],

  update({ isoPosition, display }) {
    display.sprite.position.copy(isoPosition.pos)
  },
})
