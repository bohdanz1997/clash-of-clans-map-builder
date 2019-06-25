import { MatrixHelper } from 'core/math'
import { Point } from 'pixi.js'
import * as n from '../nodes'

/**
 * @param engine
 * @param world
 * @param map
 * @param {Config} config
 * @param {PointerManager} pointers
 */
export const ManagePointers = ({ engine, world, map, config, pointers }) => ({
  nodes: [n.Pointer],

  init(nodes) {
    const subscribeProcessor = (node) => {
      node.context.processor = pointers.add(node)
    }

    const unsubscribeProcessor = (node) => {
      pointers.remove(node.context.processor)
    }

    nodes.each(subscribeProcessor)
    nodes.onAdded(subscribeProcessor)
    nodes.onRemoved(unsubscribeProcessor)

    this.cursorOffset = new Point(map.config.hIsoTileWidth, 0)
    this.cellSize = map.config.cellWidth
  },

  update({ context, position, isoPosition }) {
    // update cartesian position
    const tempCartPos = new Point(
      position.x - world.x - this.cursorOffset.x,
      position.y - world.y - this.cursorOffset.y,
    )

    const cartPos = MatrixHelper.invertIsoMatrix.apply(tempCartPos)
    isoPosition.cartX = cartPos.x
    isoPosition.cartY = cartPos.y

    // update tilemap position
    isoPosition.col = Math.floor(isoPosition.cartX / this.cellSize)
    isoPosition.row = Math.floor(isoPosition.cartY / this.cellSize)
  },
})

export const UpdateCursorStyle = ({ pointers }) => ({
  nodes: [n.PointerHovered],

  init(nodes) {
    nodes.onAdded(() => {
      pointers.setCursorStyle('pointer')
    })
    nodes.onRemoved(() => {
      pointers.setCursorStyle('auto')
    })
  },
})
