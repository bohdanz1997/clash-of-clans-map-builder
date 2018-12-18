import { noop } from 'core/util'
import { createComponent } from 'core/factories'
import { interactActions, interactStates } from '../constants'

export const [cInteractive, Interactive] = createComponent(
  'interactive', 'state action pressed',
  ({ press = noop, release = noop } = {}) => ({
    state: interactStates.UP,
    action: interactActions.NONE,
    pressed: false,
    press,
    release,
  })
)
