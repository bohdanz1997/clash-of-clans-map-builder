// @flow
import type { GameConfig, Engine } from 'types/game'
import type { Container } from 'types/pixi'

import { createSystem } from 'core/factories'
import { makeIsoPointer, isoMatrix } from 'core/isometric'

import { nPointer } from '../nodes'

export default ($engine: Engine, $world: Container, $config: GameConfig) => {
  const invertMatrix = isoMatrix.clone().invert()

  const makeIsoPointerUtil = ({ pointer }) => {
    makeIsoPointer(pointer.pointer, $world, invertMatrix, $config)
  }

  return createSystem({
    init(node) {
      node.each(makeIsoPointerUtil)
      node.onAdded(makeIsoPointerUtil)
    },
  })(nPointer)($engine)
}
