import { system } from 'core/scent'
import { invertIsoMatrix } from 'core/math'
import { pointerManager } from 'core/input'
import * as n from '../nodes'

export default ({ engine, world, map }) => {
  const makeIsoPointerUtil = ({ pointer }) => {
    pointerManager.toIso({
      pointer: pointer.input,
      matrix: invertIsoMatrix,
      config: map.config,
      world,
    })
  }

  return system({
    init(node) {
      node.each(makeIsoPointerUtil)
      node.onAdded(makeIsoPointerUtil)
    },

    update({ pointer }) {
      const { input } = pointer

      input.scale = world.scale.x
      input.cursor = (input.hoverOver && input.visible)
        ? 'pointer'
        : 'auto'
    },
  })(n.Pointer)(engine)
}
