import { nIsometric } from '../nodes'
import { systemPriorities } from '../core'
import { Point } from '../core/pixi'
import { getIsoMatrix } from '../core/math'
import { createSystem } from '../core/factories'

const isoMatrix = getIsoMatrix()

export default $engine => createSystem(({ position, isoPosition }) => {
  // calculate isometric position
  const isoPos = isoMatrix.apply(Point.sub(position.pos, position.offset))
  isoPosition.pos.copy(isoPos)
})(nIsometric)($engine)

export const params = {
  priority: systemPriorities.PRE_RENDER,
}
