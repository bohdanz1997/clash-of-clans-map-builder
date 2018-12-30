import * as n from '../nodes'

export default ({ world, hud }) => ({
  nodes: [n.Render],

  init(node) {
    const matchContainer = parentId => ({
      world,
      hud,
    })[parentId]

    const addRenderChild = ({ display }) => {
      matchContainer(display.parentId).addChild(display.sprite)
    }

    const removeRenderChild = ({ display }) => {
      matchContainer(display.parentId).removeChild(display.sprite)
    }

    node.each(addRenderChild)
    node.onAdded(addRenderChild)
    node.onRemoved(removeRenderChild)
  },

  update({ position, display }) {
    const { sprite, group } = display

    sprite.parentGroup = group
    sprite.position.copy(position.pos)
  },
})
