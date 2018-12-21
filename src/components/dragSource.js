import { Point } from 'core/pixi'
import { defComponent } from 'core/scent'

export const DragSource = defComponent(
  'dragSource', 'target offset startPos',
  () => ({
    target: null,
    offset: Point.EMPTY,
    startPos: Point.EMPTY,
  })
)
