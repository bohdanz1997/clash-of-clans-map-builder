import { createSystem } from 'core/scent'
import { IsoRenderNode } from '../nodes'
import { gameConfig } from '../config'

export default $engine => createSystem(({ isoPosition, display }) => {
  display.sprite.position.copy(isoPosition.pos)
})(IsoRenderNode)($engine)

export const params = {
  priority: gameConfig.priorities.ISO_RENDER,
}
