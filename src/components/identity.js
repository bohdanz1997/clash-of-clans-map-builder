import { createComponent } from 'core/scent'
import { uuid } from 'core/util'

export const [cPlayer, Player] = createComponent('player')

export const [cIdentity, Identity] = createComponent(
  'identity', 'id seed',
  ({ id = null } = {}) => ({ seed: uuid(), id }),
)
