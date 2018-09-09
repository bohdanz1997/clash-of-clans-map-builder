import { createSystem } from '../core/factories'
import { nRender } from '../nodes'

export default $engine => createSystem({
  update({ position, display }) {
    display.sprite.position.copy(position.pos)
  }
})(nRender)($engine)
