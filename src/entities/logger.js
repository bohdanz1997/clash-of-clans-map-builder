import { createEntity } from 'core/scent'
import { withDisplay } from '../services'
import * as c from '../components'

export const Logger = ({
  data: { x, y },
}) => createEntity(
  c.Log(),
  c.Position({ x, y }),
  c.Display({ sprite: withDisplay.textSprite({ fill: '#fff', fontSize: 13 }), parentId: 'hud' }),
)
