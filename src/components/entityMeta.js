import { createComponent } from 'core/scent'

export const [cEntityMeta, EntityMeta] = createComponent(
  'entityMeta', 'id level count',
  ({ id, level = 1, count = 1 }) => ({ id, level, count }),
)
