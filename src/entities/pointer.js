import { createEntity } from 'core/factories'
import { makePointer } from 'core/input'

import * as c from '../components'
import { targetEl } from '../gameConfig'

export default () => (
  createEntity(
    c.Pointer({
      pointer: makePointer({
        element: targetEl,
      }),
    }),
  )
)
