import { Point } from 'pixi.js'
import * as c from '../components'
import * as n from '../nodes'
import * as e from '../entities'

const DebugCommon = () => ({
  nodes: [n.Pointer, n.Debug, n.InventoryItemSelected, n.Camera],

  update(pointerNode, debugNode, selectedNode, cameraNode) {
    const pointer = pointerNode.head
    if (!pointer) {
      return
    }
    const camera = cameraNode.head
    const { position, isoPosition, entity } = pointer

    let selectedInfo = 'none'
    if (selectedNode.head) {
      const { entityMeta } = selectedNode.head
      selectedInfo = `${entityMeta.id} (${entityMeta.def})`
    }

    let targetInfo = 'none'
    if (pointer.entity.has(c.Interact.Target)) {
      const target = pointer.entity.get(c.Interact.Target).entity
      const targetPos = target.get(c.Position)
      const targetIsoPos = target.has(c.IsoPosition) ? target.get(c.IsoPosition) : Point.EMPTY

      targetInfo = `
        x: ${Math.floor(targetPos.x)}
        y: ${Math.floor(targetPos.y)}
        isoX: ${Math.floor(targetIsoPos.x)}
        isoY: ${Math.floor(targetIsoPos.y)}
        col: ${targetPos.col}
        row: ${targetPos.row}
        state: ${target.get(c.FSM).fsm.currentStateName}
      `
    }

    debugNode.head.display.sprite.text = `
      x: ${position.x}
      y: ${position.y}
      cartX: ${Math.floor(isoPosition.cartX)}
      cartY: ${Math.floor(isoPosition.cartY)}
      camX: ${Math.floor(camera.position.x)}
      camY: ${Math.floor(camera.position.y)}
      column: ${isoPosition.col}
      row: ${isoPosition.row}
      state: ${entity.get(c.FSM).fsm.currentStateName}
      selected: ${selectedInfo}
      target: ${targetInfo}
    `
  },
})

const AddDebugToEntity = ({ entities }) => ({
  nodes: [n.Building],

  init(buildings) {
    const addDebug = params => (node) => {
      const debug = entities.add(e.Debug)
      node.entity.add(c.Child.Debug({
        entity: debug,
        offset: params.offset,
      }))
    }

    const subscribe = (nodes, params) => {
      nodes.each(addDebug(params))
      nodes.onAdded(addDebug(params))
    }

    subscribe(buildings, {
      offset: new Point(-110, 0),
    })
  },
})

const DebugBuilding = () => ({
  nodes: [n.BuildingWithDebug],

  update(node) {
    const { child, position, isoPosition, fsm, identity } = node

    child.entity.get(c.Display).sprite.text = `
${identity.id}, ${identity.seed}
fsm: ${fsm.fsm.currentStateName}
pos: [${Math.floor(position.x)}, ${Math.floor(position.y)}]
iso: [${Math.floor(isoPosition.x)}, ${Math.floor(isoPosition.y)}]
map: [${position.col}, ${position.row}]
    `
  },
})

export const Debug = [DebugCommon, AddDebugToEntity, DebugBuilding]
