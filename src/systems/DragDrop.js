import * as c from '../components'
import * as n from '../nodes'

export default () => ({
  nodes: [n.Observer],

  init(nodes) {
    nodes.onAdded((node) => {
      const ePointer = node.client.entity
      ePointer.get(c.Pointer).input.hoverOver = true
    })
    nodes.onRemoved((node) => {
      const ePointer = node.client.entity
      ePointer.get(c.Pointer).input.hoverOver = false
    })
  },
})
