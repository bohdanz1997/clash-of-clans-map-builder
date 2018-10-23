import { createSystem } from 'core/factories'
import { nIsoRender } from '../nodes'
import priorities from './priorities'

export default $engine => createSystem(({ isoPosition, display }) => {
  display.sprite.position.copy(isoPosition.pos)
})(nIsoRender)($engine)

export const params = {
  priority: priorities.ISO_RENDER,
}
