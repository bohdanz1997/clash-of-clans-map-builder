import { Point } from 'core/pixi'
import { isoMatrix } from 'core/isometric'
import { createSystem } from 'core/factories'
import { nIsometric } from '../nodes'
import { gameConfig } from '../config'

export default $engine => createSystem(({ position, isoPosition }) => {
  const isoPos = isoMatrix.apply(Point.sub(position.pos, position.offset))
  isoPosition.pos.copy(isoPos)
})(nIsometric)($engine)

export const params = {
  priority: gameConfig.priorities.PRE_RENDER,
}
