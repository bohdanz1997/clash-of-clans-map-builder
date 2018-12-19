import { Point } from 'core/pixi'
import { createComponent } from 'core/scent'

export const [cDragSource, DragSource] = createComponent(
  'dragSource', 'target offset',
  () => ({
    target: null,
    offset: Point.EMPTY,
  })
)
