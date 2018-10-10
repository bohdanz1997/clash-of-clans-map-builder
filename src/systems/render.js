import { nRender } from '../nodes'
import { systemPriorities } from '../core'
import { Point } from '../core/pixi'
import { createSystem } from '../core/factories'
import { getIsoMatrix } from '../core/graphics/matrixHelpers'

const isoMatrix = getIsoMatrix()

const handler = ({ position, display }) => {
  const isoPos = isoMatrix.apply(Point.sub(position.pos, position.offset))
  display.sprite.position.copy(isoPos)
}

export default $engine => createSystem(handler)(nRender)($engine)

export const params = {
  priority: systemPriorities.RENDER,
}
