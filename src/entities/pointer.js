import { createEntity } from 'core/factories'
import { makePointer } from 'core/input'

import * as c from '../components'
import { gameConfig } from '../config'

export default () => (
  createEntity(
    c.Pointer({
      pointer: makePointer({
        element: gameConfig.targetEl,
      }),
    }),
  )
)
