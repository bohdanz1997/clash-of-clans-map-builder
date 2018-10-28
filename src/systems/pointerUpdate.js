// @flow
import type { Engine } from 'types/game'
import type { Container } from 'types/pixi'

import { createSystem } from 'core/factories'
import { nPointer } from '../nodes'

export default ($engine: Engine, $world: Container) => {
  return createSystem({
    update({ pointer }) {
      pointer.pointer.scale = $world.scale.x
    },
  })(nPointer)($engine)
}
