import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'

export const Hud = ({
  data: { id, x, y },
}) => createEntity(
  c.HudLayer(),
  c.Position({ x, y }),
  c.Display(DisplayFactory.text({
    fontSize: 12,
    fill: 'white',
  }))
)
