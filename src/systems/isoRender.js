import { system } from 'core/scent'
import * as n from '../nodes'
import { gameConfig } from '../config'

export default ({ engine }) => system(({ isoPosition, display }) => {
  display.sprite.position.copy(isoPosition.pos)
})(n.IsoRender)(engine)

export const params = {
  priority: gameConfig.priorities.ISO_RENDER,
}
