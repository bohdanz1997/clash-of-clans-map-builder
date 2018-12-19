// @flow
import type { GameConfig, Engine } from 'types/game'
import type { Container } from 'types/pixi'

import { createSystem } from 'core/scent'
import { invertIsoMatrix } from 'core/math'
import { pointerManager } from 'core/input'

import { PointerNode } from '../nodes'

export default ($engine: Engine, $world: Container, $config: GameConfig) => {
  const makeIsoPointerUtil = ({ pointer }) => {
    pointerManager.toIso({
      pointer: pointer.pointer,
      matrix: invertIsoMatrix,
      config: $config,
      world: $world,
    })
  }

  return createSystem({
    init(node) {
      node.each(makeIsoPointerUtil)
      node.onAdded(makeIsoPointerUtil)
    },

    update({ pointer }) {
      pointer.pointer.scale = $world.scale.x
    },
  })(PointerNode)($engine)
}
