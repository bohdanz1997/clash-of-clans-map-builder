import { Point } from 'core/pixi'
import { isoMatrix } from 'core/math'
import { system } from 'core/scent'
import * as n from '../nodes'
import { gameConfig } from '../config'

export default ({ engine }) => system(({ position, isoPosition }) => {
  const isoPos = isoMatrix.apply(Point.sub(position.pos, position.offset))
  isoPosition.pos.copy(isoPos)
})(n.Isometric)(engine)

export const params = {
  priority: gameConfig.priorities.PRE_RENDER,
}
