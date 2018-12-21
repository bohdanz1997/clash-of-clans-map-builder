import { defComponent } from 'core/scent'

export const Health = defComponent(
  'health', 'current max',
  ({ health }) => ({
    current: health,
    max: health,
  })
)
