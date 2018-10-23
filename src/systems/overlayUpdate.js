import { createSystem } from 'core/factories'
import { nOverlay } from '../nodes'
import priorities from './priorities'

export default $engine => createSystem(({ overlay, position }) => {
  position.pos.copy(overlay.target.pos)
})(nOverlay)($engine)

export const params = {
  priority: priorities.UPDATE,
}
