import * as c from '../components'
import { createSprite } from '../core/pixi'
import { createEntity } from '../core/factories'
import { blob } from '../assets/atlas/treasureHunter'

export default ({ x, y, speed }) => {
  const sprite = createSprite(blob)
  const { width, height } = sprite

  return createEntity(
    c.Enemy(),
    c.Position({ x, y }),
    c.Motion(),
    c.Collision({ width, height }),
    c.Control({ dx: speed, dy: speed }),
    c.Display({ sprite }),
    c.Intelect({
      maxTime: 30,
    }),
  )
}
