import { createEntity } from 'core/scent'
import { View } from 'core/display'
import * as c from '../components'

export const Debug = ({
  data: { x, y },
}) => createEntity(
  c.Layer.Debug(),
  c.Position({ x, y }),
  c.Display(
    View.text({
      dropShadow: true,
      dropShadowDistance: 1,
    })
  )
)
