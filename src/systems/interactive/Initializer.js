import * as c from '../../components'
import * as n from '../../nodes'

export const InteractiveInitializer = () => ({
  nodes: [n.PointerContext, n.Interactive],

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
