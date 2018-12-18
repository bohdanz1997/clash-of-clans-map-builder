import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export default ({ id, x, y }) => pipeHOCs(
  withComponents(
    c.HudLayer(),
    c.Position({ x, y }),
  ),
  withDisplay.text({
    font: '12px sans',
    fillStyle: 'white',
    parentId: 'hud',
  }),
)
