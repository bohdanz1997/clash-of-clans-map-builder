import { Point } from '../core/util'
import { createComponent } from '../core/factories'

export const [cPosition, createPosition] = createComponent('position', 'pos', ({ x, y }) => ({
  pos: new Point(x, y),
}))

export const [cMotion, createMotion] = createComponent('motion', 'vel', ({ vx, vy }) => ({
  vel: new Point(vx, vy),
}))

export const [cControl, createControl] = createComponent('control', 'dir')
