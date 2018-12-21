import { noop } from 'core/util'
import { createComponent } from 'core/scent'
import { interactActions, interactStates } from '../constants'

export const [cInteractive, Interactive] = createComponent(
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

const [cClient, Client] = createComponent('client', 'entity')
const [cSource, Source] = createComponent('source', 'entity')

export const Interact = {
  cClient,
  Client,
  cSource,
  Source,
}
