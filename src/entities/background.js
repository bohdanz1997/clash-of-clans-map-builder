import { createSprite } from 'core/pixi'
import { createEntity } from 'core/factories'
import { dungeon } from 'assets/atlas/treasureHunter'

import * as c from '../components'

export default ({ x, y }) => {
  const sprite = createSprite(dungeon, x, y)

  return createEntity(
    c.Position({ x, y }),
    c.Display({ sprite }),
  )
}
