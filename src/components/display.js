import { defComponent } from 'core/scent'

export const Display = defComponent(
  'display', 'sprite group oldGroup parentId',
  ({ sprite, parentId = 'world' }) => ({
    sprite,
    parentId,
    group: null,
    oldGroup: null,
  }),
)
