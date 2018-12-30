import * as n from '../nodes'

export default () => ({
  nodes: [n.Collision],

  update({ position, collision }) {
    collision.bounds.setPosition(position.pos)
  },
})
