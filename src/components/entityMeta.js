import { defComponent } from 'core/scent'

export const EntityMeta = defComponent(
  'entityMeta', 'id def level count',
  ({ id, def = null, level = 1, count = 1 }) => ({ id, def, level, count }),
)
