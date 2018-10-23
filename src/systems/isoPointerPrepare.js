// @flow
import type { GameConfig, Engine } from 'types/game'
import type { Application } from 'types/pixi'

import { createSystem } from 'core/factories'
import { makeIsoPointer, isoMatrix } from 'core/isometric'

import { nPointer } from '../nodes'

export default ($engine: Engine, $app: Application, $config: GameConfig) => {

  const world = $app.stage.childByName('gameScene')
  const invertMatrix = isoMatrix.clone().invert()

  const makeIsoPointerUtil = ({ pointer }) => {
    makeIsoPointer(pointer.pointer, world, invertMatrix, $config)
  }

  return createSystem({
    init(node) {
      node.each(makeIsoPointerUtil)
      node.onAdded(makeIsoPointerUtil)
    },
  })(nPointer)($engine)
}
