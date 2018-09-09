import * as c from '../components'
import { createSprite } from '../core/pixi'
import { createEntity } from '../core/factories'
import { expolorer } from '../assets/atlas/treasureHunter'

export default ({ x, y, speed, health, damage }) => {
  const sprite = createSprite(expolorer, x, y)
  const { width, height } = sprite

  return createEntity(
    c.Player(),
    c.Position({ x, y }),
    c.Motion(),
    c.Collision({ width, height }),
    c.Control({ dx: speed, dy: speed }),
    c.Damage({ rate: damage }),
    c.Health({ health }),
    c.Display({ sprite }),
  )
}
