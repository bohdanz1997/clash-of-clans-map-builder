import { createEntity } from 'core/factories'

import * as c from '../components'

export default ({ x, y, width, height, collisionRadius, health }) => (
  createEntity(
    c.Building(),
    c.DefenceBuilding(),
    c.Wall(),
    c.Health({ health }),
    c.Position({ x, y }),
    c.Collision({ width, height, radius: collisionRadius }),
    c.Interact(),
    c.MotionControl(),
  )
)
