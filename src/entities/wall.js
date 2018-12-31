import { createEntity } from 'core/scent'
import * as c from '../components'

export default ({
  data: { x, y, width, height, collisionRadius, health },
}) => (
  createEntity(
    c.Building(),
    c.DefenceBuilding(),
    c.Wall(),
    c.Health({ health }),
    c.Position({ x, y }),
    c.Collision({ width, height, radius: collisionRadius }),
    c.MotionControl(),
  )
)
