import { createSystem } from 'core/factories'
import { nOverlay } from '../nodes'
import { gameConfig } from '../config'

export default $engine => createSystem(({ overlay, position }) => {
  position.pos.copy(overlay.target.pos)
})(nOverlay)($engine)

export const params = {
  priority: gameConfig.priorities.UPDATE,
}
