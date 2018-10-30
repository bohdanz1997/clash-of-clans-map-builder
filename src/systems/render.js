import { createSystem } from 'core/factories'
import { nRender } from '../nodes'
import { gameConfig } from '../config'

export default ($engine, $world, $hud) => {
  const matchContainer = parentId => ({
    world: $world,
    hud: $hud,
  })[parentId]

  return createSystem({
    init(node) {
      node.each(({ display }) => {
        matchContainer(display.parentId).addChild(display.sprite)
      })

      node.onAdded(({ display }) => {
        matchContainer(display.parentId).addChild(display.sprite)
      })

      node.onRemoved(({ display }) => {
        matchContainer(display.parentId).removeChild(display.sprite)
      })
    },

    update({ position, display }) {
      const { sprite, group } = display

      sprite.parentGroup = group
      sprite.position.copy(position.pos)
    },
  })(nRender)($engine)
}

export const params = {
  priority: gameConfig.priorities.RENDER,
}
