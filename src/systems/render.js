import { createSystem } from '../core/factories'
import { nRender } from '../nodes'

const handler = ({ position, display }) => {
  display.sprite.position.copy(position.pos)
}

export default $engine => createSystem(handler)(nRender)($engine)
