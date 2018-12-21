import { createEntity } from 'core/scent'

import * as c from '../components'

export default ({ x, y, width, height, collisionRadius, health }) => (
  createEntity(
    c.Building.of(),
    c.DefenceBuilding.of(),
    c.Wall.of(),
    c.Health.of({ health }),
    c.Position.of({ x, y }),
    c.Collision.of({ width, height, radius: collisionRadius }),
    c.MotionControl.of(),
  )
)
