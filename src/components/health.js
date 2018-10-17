import { createComponent } from '../core/factories'

export const [cHealth, Health] = createComponent(
  'health', 'current max',
  ({ health }) => ({
    current: health,
    max: health,
  })
)
