import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'

export const Debug = ({
  data: { x, y },
}) => createEntity(
  c.Layer.Debug(),
  c.Position({ x, y }),
  c.Display(DisplayFactory.text({
    fontSize: 12,
    fill: 'white',
  }))
)
