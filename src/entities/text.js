import { createEntity } from 'core/scent'
import { View } from 'core/display'
import * as c from '../components'

export const Text = ({
  data: { x, y },
}) => createEntity(
  c.Position({ x, y }),
  c.Display(View.text({
    fontSize: 12,
    fill: 'white',
  }))
)
