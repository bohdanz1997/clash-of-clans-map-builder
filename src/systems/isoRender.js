import { systemPriorities } from 'core'
import { createSystem } from 'core/factories'
import { nIsoRender } from '../nodes'

export default $engine => createSystem(({ isoPosition, display }) => {
  display.sprite.position.copy(isoPosition.pos)
})(nIsoRender)($engine)

export const params = {
  priority: systemPriorities.ISO_RENDER,
}
