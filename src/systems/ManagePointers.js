import { MatrixHelper } from 'core/math'
import { useNodes, onUpdate, onNodeAdded, onNodeRemoved } from 'core/ecs'
import { Point } from 'pixi.js'
import * as n from '../nodes'

/**
 * @param engine
 * @param world
 * @param map
 * @param {Config} config
 * @param {PointerManager} pointers
 */
export const ManagePointers = ({ engine, world, map, config, pointers }) => {
  useNodes([n.Pointer])

  const cursorOffset = new Point(map.config.hIsoTileWidth, 0)
  const cellSize = map.config.cellWidth

  const subscribeProcessor = (node) => {
    node.context.processor = pointers.add(node)
  }

  const unsubscribeProcessor = (node) => {
    pointers.remove(node.context.processor)
  }

  onNodeAdded(subscribeProcessor)
  onNodeRemoved(unsubscribeProcessor)

  onUpdate(({ context, position, isoPosition }) => {
    // update cartesian position
    const tempCartPos = new Point(
      position.x - world.x - cursorOffset.x,
      position.y - world.y - cursorOffset.y,
    )

    const cartPos = MatrixHelper.invertIsoMatrix.apply(tempCartPos)
    isoPosition.cartX = cartPos.x
    isoPosition.cartY = cartPos.y

    // update tilemap position
    isoPosition.col = Math.floor(isoPosition.cartX / cellSize)
    isoPosition.row = Math.floor(isoPosition.cartY / cellSize)
  })
}

export const UpdateCursorStyle = ({ pointers }) => {
  useNodes([n.PointerHovered])

  onNodeAdded(() => {
    pointers.setCursorStyle('pointer')
  })
  onNodeRemoved(() => {
    pointers.setCursorStyle('auto')
  })
}
