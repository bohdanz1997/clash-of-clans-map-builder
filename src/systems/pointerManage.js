// @flow
import type { GameConfig, Engine } from '../types/game'
import type { Application } from '../types/pixi'

import { getIsoMatrix } from '../core/math'
import { createSystem } from '../core/factories'
import { makeIsoPointer } from '../core/isometric'

import { nPointer } from '../nodes'

export default ($engine: Engine, $app: Application, $config: GameConfig) => {

  const world = $app.stage.childByName('gameScene')
  const invertMatrix = getIsoMatrix().clone().invert()

  const makeIsoPointerUtil = (pointer) => {
    makeIsoPointer(pointer, world, invertMatrix, $config)
  }

  return createSystem({
    init(node) {
      node.each(({ pointer }) => {
        makeIsoPointerUtil(pointer.pointer)
      })

      node.onAdded(({ pointer }) => {
        makeIsoPointerUtil(pointer.pointer)
      })
    },
  })(nPointer)($engine)
}
