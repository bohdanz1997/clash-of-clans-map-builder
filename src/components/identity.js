import { component } from 'core/scent'
import { uuid } from 'core/util'

export const Player = component('player')

export const Identity = component(
  'identity', 'id seed',
  (id = null) => ({ seed: uuid(), id }),
)
