import { Point } from 'core/pixi'
import { isoMatrix } from 'core/math'
import * as n from '../nodes'

export default () => ({
  nodes: [n.Isometric],

  update({ position, isoPosition }) {
    const isoPos = isoMatrix.apply(Point.sub(position.pos, position.offset))
    isoPosition.pos.copy(isoPos)
  },
})
