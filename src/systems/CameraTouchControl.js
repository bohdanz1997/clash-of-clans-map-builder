import { Point } from 'core/pixi'
import * as n from '../nodes'

const pointIn = range => (point) => {
  let x = Math.min(point.x, range)
  x = Math.max(x, -range)

  let y = Math.min(point.y, range)
  y = Math.max(y, -range)

  return Point.of(x, y)
}

export default () => ({
  nodes: [n.CameraControl, n.Pointer],

  init() {
    const maxScrollSpeed = 30

    this.origDragPoint = null
    this.pointInRange = pointIn(maxScrollSpeed)
  },

  update(nCamera, nPointer) {
    const {
      motion,
    } = nCamera.head

    const {
      pointer,
      dragSource,
    } = nPointer.head

    if (pointer.input.isDown && dragSource.target === null) {
      if (this.origDragPoint) {
        const diff = Point.sub(this.origDragPoint, pointer.input.position)
        const corrected = this.pointInRange(diff)
        motion.vel.copy(corrected)
      }

      this.origDragPoint = pointer.input.position.clone()
    } else {
      this.origDragPoint = null
    }
  },
})
