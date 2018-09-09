import * as c from '../components'
import { createSprite } from '../core/pixi'
import { createEntity } from '../core/factories'
import { expolorer } from '../assets/atlas/treasureHunter'

export default ({ x, y, speed, health, damage }) => {
  const sprite = createSprite(expolorer, x, y)

  return createEntity(
    c.Position({ x, y }),
    c.Motion(),
    c.Control({ dx: speed, dy: speed }),
    c.Damage({ rate: damage }),
    c.Health({ health }),
    c.Display({ sprite }),
  )
}
