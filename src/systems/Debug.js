import { Point } from 'pixi.js'
import { onNodeAdded, onNodeRemoved, onUpdate, system } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'
import * as e from '../entities'

const DebugCommon = system(() => {
  onUpdate((pointerNode, debugNode, selectedNode, cameraNode) => {
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
  })
}, [n.Pointer, n.Debug, n.InventoryItemSelected, n.Camera])

const AddDebugToEntity = system(({ entities }) => {
  const addDebug = params => (node) => {
    const debug = entities.add(e.Debug, params.args)
    node.entity.add(params.childType({
      entity: debug,
      offset: params.offset,
    }))
  }

  onNodeAdded(addDebug({
    offset: new Point(-110, 0),
    childType: c.Child.Debug,
  }), n.Building)

  onNodeAdded(addDebug({
    args: { x: 20 },
    childType: c.Child.Default,
  }), n.Pointer)

}, [n.Building, n.Pointer])

const DebugBuilding = system(() => {
  onUpdate((node) => {
    const { child, position, isoPosition, fsm, identity } = node

    child.entity.get(c.Display).sprite.text = `
${identity.id}, ${identity.seed}
fsm: ${fsm.fsm.currentStateName}
pos: [${Math.floor(position.x)}, ${Math.floor(position.y)}]
iso: [${Math.floor(isoPosition.x)}, ${Math.floor(isoPosition.y)}]
map: [${position.col}, ${position.row}]
    `
  })
}, [n.BuildingWithDebug])

export const DebugPointer = system(() => {
  onUpdate((node) => {
    const { child, position, isoPosition, fsm } = node

    child.entity.get(c.Display).sprite.text = `
pos: [${Math.floor(position.x)}, ${Math.floor(position.y)}]
cart: [${Math.floor(isoPosition.cartX)}, ${Math.floor(isoPosition.cartY)}]
map: [${isoPosition.col}, ${isoPosition.row}]
state: ${fsm.fsm.currentStateName}
    `
  })
}, [n.PointerWithDebug])

export const Debug = [
  DebugCommon,
  AddDebugToEntity,
  DebugBuilding,
  DebugPointer,
]
