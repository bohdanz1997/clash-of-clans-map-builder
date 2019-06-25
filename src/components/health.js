import { component } from 'core/scent'

export const Health = component(
  'health', 'current max',
  ({ health }) => ({
    current: health,
    max: health,
  })
)
