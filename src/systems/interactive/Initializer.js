import * as c from 'app/components'
import * as n from 'app/nodes'

export default () => ({
  nodes: [n.ClientInitializer, n.SourceInitializer],

  init(clients, sources) {
    const addState = (node) => {
      node.entity.add(c.Idle)
    }

    const removeState = (node) => {
      node.entity.remove(c.Idle)
    }

    clients.each(addState)
    clients.onAdded(addState)
    clients.onRemoved(removeState)

    sources.each(addState)
    sources.onAdded(addState)
    sources.onRemoved(removeState)
  },
})
