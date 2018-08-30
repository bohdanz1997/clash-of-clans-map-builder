import { createEntity } from '../core/factories'
import * as c from '../components'

export default ({ x, y, speed, health, damage }) => (
  createEntity(
    c.Archer(),
    c.Damage({ rate: damage }),
    c.Health({ health }),
    c.Position({ x, y }),
    c.Motion({ vx: speed, vy: speed }),
  )
)
