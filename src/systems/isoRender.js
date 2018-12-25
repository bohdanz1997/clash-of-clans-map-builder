import { system } from 'core/scent'
import * as n from '../nodes'

export const IsoRender = ({ engine }) => system(({ isoPosition, display }) => {
  display.sprite.position.copy(isoPosition.pos)
})(n.IsoRender)(engine)
