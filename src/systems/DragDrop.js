import * as c from '../components'
import * as n from '../nodes'

export default () => ({
  nodes: [n.PointerInteracts],

  init(nodes) {
    nodes.onAdded(({ context }) => {
      context.hovered = true
    })
    nodes.onRemoved(({ context }) => {
      context.hovered = false
    })
  },
})
