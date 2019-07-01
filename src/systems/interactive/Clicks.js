import { useNodes, onUpdate } from 'core/ecs'
import * as c from '../../components'
import * as n from '../../nodes'
import * as e from '../../entities'

/**
 * @param {EntityManager} entities
 */
const RemoveHoveredBuilding = ({ entities }) => {
  useNodes([n.Pointer, n.BuildingHovered, n.InventoryItem])

  const addInventoryItem = (iItems, id, def) => {
    const foundIItem = iItems.find(item => item.entityMeta.def === def)
    if (foundIItem) {
      foundIItem.entityMeta.count += 1
    } else {
      entities.add(e.InventoryItem, {
        index: iItems.size,
        entityMeta: {
          id,
          def,
          count: 1,
        },
      })
    }
  }

  onUpdate((pointers, buildings, iItems) => {
    const pointer = pointers.head
    const building = buildings.head

    if (building && pointer.context.rightJustDown) {
      addInventoryItem(iItems, building.identity.id, building.building.def)
      building.entity.dispose()
    }
  })
}

const SelectBuilding = () => {
  useNodes([n.BuildingClicked, n.BuildingSelected])

  onUpdate((clickedList, selectedList) => {
    const clicked = clickedList.head
    const selected = selectedList.head

    if (clicked) {
      if (selected && clicked.entity !== selected.entity) {
        selected.entity.remove(c.Selected)
      }
      if (clicked.entity.has(c.Selected)) {
        clicked.entity.remove(c.Selected)
      } else {
        clicked.entity.add(c.Selected)
      }
    }
  })
}

export const Clicks = [
  SelectBuilding,
  RemoveHoveredBuilding,
]
