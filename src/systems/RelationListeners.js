import { Symbols, useNodes, onNodeAdded, onNodeRemoved } from 'core/ecs'
import { css } from 'core/util'
import * as c from '../components'
import * as n from '../nodes'
import { levels } from '../config'

const ParentRelationsNodes = Object.values(n.ParentRelations)

const circleStyle = css`
  color: white;
  font-weight: bold;
  border-radius: 50%;
  padding: 0 3px;
`
const greenStyle = css`
  ${circleStyle};
  background: green;
`
const redStyle = css`
  ${circleStyle};
  background: red;
`

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
    const { child, entity } = node
    child.entity.dispose()
    entity.remove(child[Symbols.bType])
  }

  onNodeAdded(addToChild, n.ParentRelations.Overlay)
  onNodeRemoved(removeFromChild, n.ParentRelations.Overlay)

  onNodeAdded(addToChild, n.ParentRelations.Debug)
  onNodeRemoved(removeFromChild, n.ParentRelations.Debug)

  onNodeAdded(addToChild, n.ParentRelations.DebugUI)
  onNodeRemoved(removeFromChild, n.ParentRelations.DebugUI)

  onNodeAdded(addToChild, n.ParentRelations.Default)
  onNodeRemoved(removeFromChild, n.ParentRelations.Default)

  // Manually add, remove child, parent components
  // onNodeAdded(addToChild, n.ParentRelations.Preview)
  // onNodeRemoved(removeFromChild, n.ParentRelations.Preview)
}

export const ChildRelationListener = ({ log }) => {
  useNodes([n.Child])

  onNodeAdded((node) => {
    const { parent, entity } = node
    log(levels.relation, `[c="${greenStyle}"]+[c] _${parent.entity.get(c.Identity).id}_ > ${entity.get(c.Identity).id}`)
  })

  onNodeRemoved((node) => {
    const { parent, entity } = node
    log(levels.relation, `[c="${redStyle}"]-[c] _${parent.entity.get(c.Identity, true).id}_ > ${entity.get(c.Identity, true).id}`)
  })
}
