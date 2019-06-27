import { Symbols } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'

export const ParentRelationListener = ({ engine }) => ({
  nodes: Object.values(n.ParentRelations),

  init(...nodeGroups) {
    const addToChild = (node) => {
      const { child, entity } = node

      child.entity.add(c.Parent({
        entity,
        offset: child.offset,
        childType: child[Symbols.bType],
      }))
      engine.addEntity(child.entity)
    }

    const removeFromChild = (node) => {
      node.child.entity.dispose()
    }

    const subscribe = (nodes) => {
      nodes.each(addToChild)
      nodes.onAdded(addToChild)
      nodes.onRemoved(removeFromChild)
    }

    nodeGroups.forEach(subscribe)
  },
})

export const ChildRelationListener = () => ({
  nodes: [n.Child],

  init(nodes) {
    const removeFromParent = (node) => {
      const { parent } = node
      parent.entity.remove(parent.childType)
    }

    nodes.onRemoved(removeFromParent)
  },
})
