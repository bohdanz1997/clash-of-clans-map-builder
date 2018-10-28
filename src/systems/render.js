import { createSystem } from 'core/factories'
import { nRender } from '../nodes'
import priorities from './priorities'

export default ($engine, $world) => createSystem({
  init(node) {
    node.each(({ display }) => {
      $world.addChild(display.sprite)
    })

    node.onAdded(({ display }) => {
      $world.addChild(display.sprite)
    })

    node.onRemoved(({ display }) => {
      $world.removeChild(display.sprite)
    })
  },

  update({ position, display }) {
    const { sprite, group } = display

    sprite.parentGroup = group
    sprite.position.copy(position.pos)
  },
})(nRender)($engine)

export const params = {
  priority: priorities.RENDER,
}
