import { createComponent } from 'core/factories'

export const [cMotionControl, MotionControl] = createComponent(
  'motionControl', 'dx dy up down left right',
  ({ dx = 0, dy = 0, ...rest } = {}) => ({
    dx, dy, ...rest,
  })
)
