import { createComponent } from 'core/scent'

export const [cDisplay, Display] = createComponent(
  'display', 'sprite group oldGroup parentId',
  ({ sprite, parentId = 'world' }) => ({
    sprite,
    parentId,
    group: null,
    oldGroup: null,
  }),
)
