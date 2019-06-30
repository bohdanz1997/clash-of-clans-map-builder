import { useNodes, onUpdate } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'

const DebugBuilding = () => {
  useNodes([n.BuildingWithDebug])

  onUpdate((node) => {
    const { child, position, isoPosition, fsm, identity } = node

    child.entity.get(c.Display).sprite.text = `${identity.id}, ${identity.seed}
fsm: ${fsm.fsm.currentStateName}
pos: [${Math.floor(position.x)}, ${Math.floor(position.y)}]
iso: [${Math.floor(isoPosition.x)}, ${Math.floor(isoPosition.y)}]
map: [${position.col}, ${position.row}]
selected: ${node.entity.has(c.Selected)}
    `
  })
}

const DebugUI = () => {
  useNodes([n.UIWithDebug])

  onUpdate((node) => {
    const { child, position, fsm, identity } = node

    child.entity.get(c.Display).sprite.text = `${identity.id}, ${identity.seed}
fsm: ${fsm.fsm.currentStateName}
pos: [${Math.floor(position.x)}, ${Math.floor(position.y)}]
    `
  })
}

export const DebugPointer = () => {
  useNodes([n.PointerWithDebug, n.InventoryItemSelected, n.Preview])

  onUpdate((pointerNodes, selectedItemNodes, previewNodes) => {
    const { child, position, isoPosition, fsm } = pointerNodes.head

    let selectedInfo = 'none'
    if (selectedItemNodes.head) {
      const { entityMeta } = selectedItemNodes.head
      selectedInfo = `selected: ${entityMeta.id} (${entityMeta.def})`
    }

    const previewInfo = `previews: ${previewNodes.size}`

    child.entity.get(c.Display).sprite.text = `[pointer]
pos: [${Math.floor(position.x)}, ${Math.floor(position.y)}]
cart: [${Math.floor(isoPosition.cartX)}, ${Math.floor(isoPosition.cartY)}]
map: [${isoPosition.col}, ${isoPosition.row}]
state: ${fsm.fsm.currentStateName}
${selectedInfo}
${previewInfo}
    `
  })
}

export const DebugCamera = () => {
  useNodes([n.CameraWithDebug])

  onUpdate((node) => {
    const { child, position } = node

    child.entity.get(c.Display).sprite.text = `[camera]
pos: [${Math.floor(position.x)}, ${Math.floor(position.y)}]
    `
  })
}

export const Debug = [
  DebugBuilding,
  DebugPointer,
  DebugCamera,
  DebugUI,
]
