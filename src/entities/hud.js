import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export const Hud = ({
  data: { id, x, y },
}) => pipeHOCs(
  withComponents(
    c.HudLayer(),
    c.Position({ x, y }),
  ),
  withDisplay.text({
    fontSize: 12,
    fill: 'white',
    parentId: 'hud',
  }),
)
