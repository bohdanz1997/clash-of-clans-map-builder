import { Point } from 'core/pixi'
import { isoMatrix } from 'core/math'
import * as n from '../nodes'

export default () => ({
  nodes: [n.Isometric],

  /**
   * @param {Isometric} node
   */
  update(node) {
    const { position, isoPosition } = node

    // iso pos for entities
    const tempIsoPos = {
      x: position.x - position.offset.x,
      y: position.y - position.offset.y,
    }

    const isoPos = isoMatrix.apply(tempIsoPos)
    isoPosition.x = isoPos.x
    isoPosition.y = isoPos.y
  },
})
