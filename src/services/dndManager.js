import { Point } from 'core/pixi'
import * as c from '../components'
import * as config from '../config'

const { groups } = config

export const createDnD = ({ cellSize }) => ({
  start(nPointer, dragTarget) {
    const { pointer, dragSource } = nPointer

    if (!dragSource.target) {
      dragSource.target = dragTarget

      const display = dragTarget.get(c.cDisplay)
      const draggable = dragTarget.get(c.cDraggable)
      const position = dragTarget.get(c.cPosition)

      // store target position
      draggable.prevPos = position.pos.clone()

      // Calculate the difference between the pointer's
      // position and the sprite's position
      const offset = pointer.input.cartPosition.sub(position.pos)
      dragSource.offset.copy(offset)

      // set higher render priority via setting drag group
      display.oldGroup = display.group
      display.group = groups.DRAG

      // TODO: use FSM
      dragTarget.remove(c.cBuildingLayer)
      dragTarget.add(c.cDragLayer)
    }
  },

  end(nPointer) {
    const { dragSource } = nPointer
    const dragTarget = dragSource.target

    if (dragTarget) {
      const display = dragTarget.get(c.cDisplay)
      // const draggable = dragTarget.get(c.cDraggable)
      // const position = dragTarget.get(c.cPosition)
      // const collision = dragTarget.get(c.cCollision)

      display.group = display.oldGroup

      // if (!buildingLayer.isEmptyInSize(position.fieldPos.x, position.fieldPos.y, collision.radius)) {
      //   position.pos.copy(draggable.prevPos)
      // }

      dragTarget.remove(c.cDragLayer)
      dragTarget.add(c.cBuildingLayer)
      dragSource.target = null
    }
  },

  move(nPointer) {
    const { pointer, dragSource } = nPointer

    if (dragSource.target) {
      const targetPosition = dragSource.target.get(c.cPosition)

      const newPos = Point.sub(
        pointer.input.cartPosition.floorNum(cellSize),
        dragSource.offset.floorNum(cellSize),
      )

      targetPosition.pos.copy(newPos)
    }
  },
})
