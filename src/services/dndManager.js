import { Point } from 'core/pixi'
import * as c from '../components'
import viewConfig from '../config/view'

const { groups } = viewConfig

export const createDnD = ({ cellSize }) => ({
  start(cPointer, dragTarget) {
    cPointer.dragTarget = dragTarget

    const { pointer } = cPointer
    const display = dragTarget.get(c.cDisplay)
    const draggable = dragTarget.get(c.cDraggable)
    const position = dragTarget.get(c.cPosition)

    // store target position
    draggable.prevPos = position.pos.clone()

    // Calculate the difference between the pointer's
    // position and the sprite's position
    const { cartPosition } = pointer
    const offset = cartPosition.sub(position.pos)
    cPointer.dragOffset.copy(offset)

    // set higher render priority via setting drag group
    display.oldGroup = display.group
    display.group = groups.DRAG

    // TODO: use FSM
    dragTarget.remove(c.cBuildingLayer)
    dragTarget.add(c.cDragLayer)
  },

  end(cPointer) {
    const { dragTarget } = cPointer
    const display = dragTarget.get(c.cDisplay)
    const draggable = dragTarget.get(c.cDraggable)
    const position = dragTarget.get(c.cPosition)
    const collision = dragTarget.get(c.cCollision)

    display.group = display.oldGroup

    // if (!buildingLayer.isEmptyInSize(position.fieldPos.x, position.fieldPos.y, collision.sizeInCells)) {
    //   position.pos.copy(draggable.prevPos)
    // }

    dragTarget.remove(c.cDragLayer)
    dragTarget.add(c.cBuildingLayer)
    cPointer.dragTarget = null
  },

  move(cPointer) {
    const { pointer, dragOffset, dragTarget } = cPointer
    const position = dragTarget.get(c.cPosition)

    const newPos = Point.sub(
      pointer.cartPosition.floorNum(cellSize),
      dragOffset.floorNum(cellSize),
    )

    position.pos.copy(newPos)
  },
})
