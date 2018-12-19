import { createComponent } from 'core/scent'

export const [cEntityMeta, EntityMeta] = createComponent(
  'entityMeta', 'id def level count',
  ({ id, def = null, level = 1, count = 1 }) => ({ id, def, level, count }),
)
