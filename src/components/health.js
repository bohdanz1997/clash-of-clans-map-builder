import { createComponent } from 'core/scent'

export const [cHealth, Health] = createComponent(
  'health', 'current max',
  ({ health }) => ({
    current: health,
    max: health,
  })
)
