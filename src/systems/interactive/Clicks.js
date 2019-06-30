import { useNodes, onUpdate, onNodeAdded, onNodeRemoved } from 'core/ecs'
import { hex, string2hex } from 'core/pixi'
import * as c from '../../components'
import * as n from '../../nodes'
import * as e from '../../entities'

const RemoveSelectedBuilding = () => {
  useNodes([n.ButtonClicked, n.BuildingSelected])

  onUpdate((buttons, selectedList) => {
    const clickedButton = buttons.head
    const selectedBuilding = selectedList.head

    if (selectedBuilding && clickedButton) {
      selectedBuilding.entity.dispose()
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

/**
 * @param {EntityManager} entities
 * @param {Align} align
 */
const OnBuildingSelected = ({ entities, align }) => {
  useNodes([n.BuildingSelected])

  let removeButton = null

  onNodeAdded((node) => {
    node.child.entity.get(c.Display).sprite.tint = hex`#8bc34a`

    const pos = align.bottomCenter(50, 200)
    removeButton = entities.add(e.Button, {
      x: pos.x,
      y: pos.y,
      width: 100,
      height: 80,
      color: string2hex('#00cc76'),
    })
  })

  onNodeRemoved((node) => {
    node.child.entity.get(c.Display).sprite.tint = hex`#ffffff`
    removeButton.dispose()
  })
}

export const Clicks = [
  SelectBuilding,
  RemoveSelectedBuilding,
  OnBuildingSelected,
]
