import { defComponent } from 'core/scent'
import { uuid } from 'core/util'

export const Player = defComponent('player')

export const Identity = defComponent(
  'identity', 'id seed',
  (id = null) => ({ seed: uuid(), id }),
)
