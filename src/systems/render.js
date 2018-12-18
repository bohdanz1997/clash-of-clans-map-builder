import { createSystem } from 'core/factories'
import { nRender } from '../nodes'
import { gameConfig } from '../config'

export default ($engine, $world, $hud) => {
  const matchContainer = parentId => ({
    world: $world,
    hud: $hud,
  })[parentId]

  const addRenderChild = ({ display }) => {
    matchContainer(display.parentId).addChild(display.sprite)
  }

  const removeRenderChild = ({ display }) => {
    matchContainer(display.parentId).removeChild(display.sprite)
  }

  return createSystem({
    init(node) {
      node.each(addRenderChild)
      node.onAdded(addRenderChild)
      node.onRemoved(removeRenderChild)
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
