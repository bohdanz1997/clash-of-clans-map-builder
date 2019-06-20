import { createEntity } from 'core/scent'
import { displayFactory } from 'core/display'
import * as c from '../components'

export default ({
  data: { id, x, y },
}) => createEntity(
  c.HudLayer(),
  c.Position({ x, y }),
  c.Display(displayFactory.text({
    fontSize: 12,
    fill: 'white',
  }))
)
