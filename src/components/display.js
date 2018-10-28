import { createComponent } from 'core/factories'

export const [cDisplay, Display] = createComponent(
  'display', 'sprite group oldGroup parentId',
  ({ sprite, parentId = 'world' }) => ({
    sprite,
    parentId,
    group: null,
    oldGroup: null,
  }),
)
