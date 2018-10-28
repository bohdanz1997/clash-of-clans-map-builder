import { createText } from 'core/factories'
import * as c from '../components'
import { withComponents, withTextDisplay, pipeHOCs } from '../components/hoc'

export default ({ id, x, y }) => {
  const text = createText({
    font: '12px sans',
    fillStyle: 'white',
    x,
    y,
  })

  return pipeHOCs(
    withComponents(
      c.HudLayer(),
      c.Position({ x, y }),
    ),
    withTextDisplay(text),
  )
}
