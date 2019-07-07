import { component } from 'core/ecs'

export const Health = component(
  'health', 'current max',
  ({ health }) => ({
    current: health,
    max: health,
  })
)
