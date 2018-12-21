import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export default ({ id, x, y }) => pipeHOCs(
  withComponents(
    c.HudLayer.of(),
    c.Position.of({ x, y }),
  ),
  withDisplay.text({
    fontSize: 12,
    fill: 'white',
    parentId: 'hud',
  }),
)
