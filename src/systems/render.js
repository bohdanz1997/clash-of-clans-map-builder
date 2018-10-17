import { nRender } from '../nodes'
import { systemPriorities } from '../core'
import { createSystem } from '../core/factories'

export default $engine => createSystem(({ position, display }) => {
  display.sprite.position.copy(position.pos)
})(nRender)($engine)

export const params = {
  priority: systemPriorities.RENDER,
}
