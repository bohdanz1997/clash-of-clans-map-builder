import * as c from '../components'
import * as n from '../nodes'

export const ParentRelationListener = ({ engine }) => ({
  nodes: [n.Parent],

  init(nodes) {
    const addToChild = (node) => {
      const { child, entity } = node
      child.entity.add(c.Relation.Parent({
        entity,
        offset: child.offset,
      }))
      engine.addEntity(child.entity)
    }

    const removeFromChild = (node) => {
      node.child.entity.dispose()
    }

    nodes.each(addToChild)
    nodes.onAdded(addToChild)
    nodes.onRemoved(removeFromChild)
  },
})

export const ChildRelationListener = () => ({
  nodes: [n.Child],

  init(nodes) {
    const removeFromParent = (node) => {
      node.parent.entity.remove(c.Relation.Child)
    }

    nodes.onRemoved(removeFromParent)
  },
})
