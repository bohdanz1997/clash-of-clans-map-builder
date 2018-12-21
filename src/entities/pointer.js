import { createEntity } from 'core/scent'

import * as c from '../components'
import { gameConfig } from '../config'

export default () => (
  createEntity(
    c.Identity.of(),
    c.Position.of(),
    c.DragSource.of(),
    c.Pointer.of({
      element: gameConfig.targetEl,
    }),
  )
)
