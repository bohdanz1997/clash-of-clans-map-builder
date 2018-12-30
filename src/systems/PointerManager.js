import { invertIsoMatrix } from 'core/math'
import { pointerManager } from 'core/input'
import * as n from '../nodes'

export default ({ engine, world, map }) => ({
  nodes: [n.Pointer],

  init(node) {
    const makeIsoPointerUtil = ({ pointer }) => {
      pointerManager.toIso({
        pointer: pointer.input,
        matrix: invertIsoMatrix,
        config: map.config,
        world,
      })
    }

    node.each(makeIsoPointerUtil)
    node.onAdded(makeIsoPointerUtil)
  },

  update({ pointer, position }) {
    const { input } = pointer

    // input.position.copy(position.pos)
    input.scale = world.scale.x
    input.cursor = (input.hoverOver && input.visible)
      ? 'pointer'
      : 'auto'
  },
})
