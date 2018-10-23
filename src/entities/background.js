import { createSprite } from 'core/pixi'
import { createEntity } from 'core/factories'

import * as c from '../components'
import { dungeon } from '../assets/atlas/treasureHunter'

export default ({ x, y }) => {
  const sprite = createSprite(dungeon, x, y)

  return createEntity(
    c.Position({ x, y }),
    c.Display({ sprite }),
  )
}
