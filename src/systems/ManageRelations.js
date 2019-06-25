import * as c from '../components'
import * as n from '../nodes'

export const ManageParentRelation = ({ engine }) => ({
  nodes: [n.Parent],

  init(nodes) {
    const addChild = (node) => {
      const { child, entity } = node
      child.entity.add(c.Relation.Parent({
        entity,
        offset: child.offset,
      }))
      engine.addEntity(child.entity)
    }

    const removeChild = (node) => {
      node.child.entity.dispose()
    }

    nodes.each(addChild)
    nodes.onAdded(addChild)
    nodes.onRemoved(removeChild)
  },
})

export const BuildingChildMovement = () => ({
  nodes: [n.BuildingChildMovement],

  update(node) {
    const { child, position } = node
    const childPosition = child.entity.get(c.Position)

    childPosition.x = position.x
    childPosition.y = position.y
  },
})

export const PointerChildMovement = ({ map }) => ({
  nodes: [n.PointerChildMovement],

  init() {
    this.cellSize = map.config.cellWidth
  },

  update(node) {
    const { child, isoPosition } = node
    const childPosition = child.entity.get(c.Position)

    childPosition.x = (isoPosition.col * this.cellSize) - child.offset.x
    childPosition.y = (isoPosition.row * this.cellSize) - child.offset.y
  },
})
