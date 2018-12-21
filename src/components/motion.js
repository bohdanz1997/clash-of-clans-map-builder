import { defComponent } from 'core/scent'
import { Point } from 'core/pixi'

export const Motion = defComponent(
  'motion', 'vel damp',
  ({ vx = 0, vy = 0, dampX = 1, dampY = 1 } = {}) => ({
    vel: new Point(vx, vy),
    damp: new Point(dampX, dampY),
  })
)
