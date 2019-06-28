import { Symbols, useNodes, onNodeAdded, onNodeRemoved } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'

const ParentRelationsNodes = Object.values(n.ParentRelations)

export const ParentRelationListener = ({ engine }) => {
  useNodes(ParentRelationsNodes)

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

  ParentRelationsNodes.forEach((nodeType) => {
    onNodeAdded(addToChild, nodeType)
    onNodeRemoved(removeFromChild, nodeType)
  })
}

export const ChildRelationListener = () => {
  useNodes([n.Child])

  onNodeRemoved((node) => {
    const { parent } = node
    parent.entity.remove(parent.childType)
  })
}
