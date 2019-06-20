import * as n from '../nodes'

export const Animation = () => ({
  nodes: [n.Animation],

  update(node, delta) {
    node.display.sprite.update(delta)
  },
})
