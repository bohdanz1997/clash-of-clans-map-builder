import * as n from '../nodes'

export default () => ({
  nodes: [n.Collision],

  update({ position, collision }) {
    collision.bounds.x = position.x
    collision.bounds.y = position.y
  },
})
