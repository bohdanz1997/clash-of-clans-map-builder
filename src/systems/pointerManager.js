// @flow
import type { GameConfig, Engine } from 'types/game'
import type { Container } from 'types/pixi'

import { createSystem } from 'core/factories'
import { makeIsoPointer, invertIsoMatrix } from 'core/isometric'

import { PointerNode } from '../nodes'

export default ($engine: Engine, $world: Container, $config: GameConfig) => {
  const makeIsoPointerUtil = ({ pointer }) => {
    makeIsoPointer({
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
