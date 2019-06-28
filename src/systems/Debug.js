import { Point } from 'pixi.js'
import { useNodes, onNodeAdded, onUpdate } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'
import * as e from '../entities'

const AddDebugToEntity = ({ entities }) => {
  useNodes([n.Building, n.Pointer])

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

}

const DebugBuilding = () => {
  useNodes([n.BuildingWithDebug])

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
}

export const DebugPointer = () => {
  useNodes([n.PointerWithDebug])

  onUpdate((node) => {
    const { child, position, isoPosition, fsm } = node

    child.entity.get(c.Display).sprite.text = `
pos: [${Math.floor(position.x)}, ${Math.floor(position.y)}]
cart: [${Math.floor(isoPosition.cartX)}, ${Math.floor(isoPosition.cartY)}]
map: [${isoPosition.col}, ${isoPosition.row}]
state: ${fsm.fsm.currentStateName}
    `
  })
}

export const Debug = [
  AddDebugToEntity,
  DebugBuilding,
  DebugPointer,
]
