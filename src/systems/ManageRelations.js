import * as c from '../components'
import * as n from '../nodes'

export const ManageParentRelation = ({ engine }) => ({
  nodes: [n.Parent],

  init(node) {
    const addChild = (nodeItem) => {
      const { entity } = nodeItem.child
      entity.add(c.Relation.Parent(nodeItem.entity))
      engine.addEntity(entity)
    }

    const removeChild = (nodeItem) => {
      nodeItem.child.entity.dispose()
    }

    node.each(addChild)
    node.onAdded(addChild)
    node.onRemoved(removeChild)
  },
})

export const ChildRelationMovement = () => ({
  nodes: [n.Child],

  update(node) {
    const { parent, position } = node
    const parentPosition = parent.entity.get(c.Position)

    position.x = parentPosition.x
    position.y = parentPosition.y
  },
})
