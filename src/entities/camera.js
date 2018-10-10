import * as c from '../components'
import { createEntity } from '../core/factories'

export default ({ x, y, speed }) => createEntity(
  c.Camera(),
  c.Position({ x, y }),
  c.Motion(),
  c.Control({ dx: speed, dy: speed }),
)
