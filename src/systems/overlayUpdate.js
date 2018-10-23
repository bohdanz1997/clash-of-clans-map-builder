import { systemPriorities } from 'core'
import { createSystem } from 'core/factories'
import { nOverlay } from '../nodes'

export default $engine => createSystem(({ overlay, position }) => {
  position.pos.copy(overlay.target.pos)
})(nOverlay)($engine)

export const params = {
  priority: systemPriorities.UPDATE,
}
