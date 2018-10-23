import { createComponent } from 'core/factories'

export const [cControl, Control] = createComponent(
  'control', 'dx dy up down left right',
  ({ dx = 0, dy = 0, up, down, left, right } = {}) => ({ dx, dy, up, down, left, right })
)
