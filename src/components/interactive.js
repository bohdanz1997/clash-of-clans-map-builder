import { noop } from 'core/util'
import { defComponent } from 'core/scent'
import { interactActions, interactStates } from '../constants'

export const Interactive = defComponent(
  'interactive', 'state action pressed hoverOver',
  ({ press = noop, release = noop } = {}) => ({
    state: interactStates.UP,
    action: interactActions.NONE,
    pressed: false,
    hoverOver: false,
    press,
    release,
  })
)

export const Interact = {
  Client: defComponent('client', 'entity'),
  Source: defComponent('source', 'entity'),
}
