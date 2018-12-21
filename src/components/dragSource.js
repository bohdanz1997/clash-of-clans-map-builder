import { Point } from 'core/pixi'
import { createComponent } from 'core/scent'

export const [cDragSource, DragSource] = createComponent(
  'dragSource', 'target offset startPos',
  () => ({
    target: null,
    offset: Point.EMPTY,
    startPos: Point.EMPTY,
  })
)
