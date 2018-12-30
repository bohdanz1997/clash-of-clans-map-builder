import * as n from '../nodes'

export default () => ({
  nodes: [n.Animation],

  update(node, delta) {
    node.display.sprite.update(delta)
  },
})
