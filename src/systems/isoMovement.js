import { nIsometric } from '../nodes'
import { systemPriorities } from '../core'
import { Point } from '../core/pixi'
import { isoMatrix } from '../core/isometric'
import { createSystem } from '../core/factories'

export default $engine => createSystem(({ position, isoPosition }) => {
  const isoPos = isoMatrix.apply(Point.sub(position.pos, position.offset))
  isoPosition.pos.copy(isoPos)
})(nIsometric)($engine)

export const params = {
  priority: systemPriorities.PRE_RENDER,
}
