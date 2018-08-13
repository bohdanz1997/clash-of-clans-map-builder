import { Point } from '../core/util'
import { createComponent } from '../core/factories'

export const [cPosition, createPosition] = createComponent('position', 'pos', ({ x, y }) => ({
  pos: new Point(x, y),
}))

export const [cMotion, createMotion] = createComponent('motion', 'vel', ({ velX, velY }) => ({
  vel: new Point(velX, velY),
}))

export const [cControl, createControl] = createComponent('control', 'dir')
