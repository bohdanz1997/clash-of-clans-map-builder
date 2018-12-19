import { createEntity } from 'core/factories'

import * as c from '../components'
import { gameConfig } from '../config'

export default () => (
  createEntity(
    c.Identity(),
    c.Pointer({
      element: gameConfig.targetEl,
    }),
  )
)
