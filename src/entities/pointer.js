import { createEntity } from 'core/scent'

import * as c from '../components'
import { gameConfig } from '../config'

export const Pointer = () => (
  createEntity(
    c.Identity(),
    c.Position(),
    c.DragSource(),
    c.Pointer({
      element: gameConfig.targetEl,
    }),
  )
)
