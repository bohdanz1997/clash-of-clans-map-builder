import * as c from '../components'
import { createSprite } from '../core/pixi'
import { createEntity } from '../core/factories'
import { expolorer } from '../assets/atlas/treasureHunter'

export default ({ x, y, speed, health, damage }, app) => {
  const sprite = createSprite(expolorer, x, y)
  app.stage.addChild(sprite)

  return createEntity(
    c.Damage({ rate: damage }),
    c.Health({ health }),
    c.Position({ x, y }),
    c.Motion({ vx: 0, vy: 0 }),
    c.Display({ sprite }),
    c.Control({ dx: speed, dy: speed })
  )
}
