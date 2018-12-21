import { defComponent } from 'core/scent'

export const MotionControl = defComponent(
  'motionControl', 'dx dy up down left right',
  ({ dx = 0, dy = 0, ...rest } = {}) => ({
    dx, dy, ...rest,
  })
)
