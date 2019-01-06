import * as c from '../components'
import * as n from '../nodes'

export default ({ world, hud }) => ({
  nodes: [n.Render],

  init(nodes) {
    const layersToContainers = [
      [c.GroundLayer, world],
      [c.BackGroundLayer, world],
      [c.BuildingLayer, world],
      [c.DragLayer, world],
      [c.HudLayer, hud],
    ]

    const findContainerByLayerComponent = (node) => {
      const res = layersToContainers.find(([ComponentLayer]) => (
        node.entity.has(ComponentLayer, true)
      ))

      if (!res) {
        const identity = node.entity.get(c.Identity, true)
        throw new Error(`Found entity (${identity.id}) without layer component`)
      }

      return res[1]
    }

    const addRenderChild = (node) => {
      const container = findContainerByLayerComponent(node)
      container.addChild(node.display.sprite)
    }

    const removeRenderChild = (node) => {
      const container = findContainerByLayerComponent(node)
      container.removeChild(node.display.sprite)
    }

    nodes.each(addRenderChild)
    nodes.onAdded(addRenderChild)
    nodes.onRemoved(removeRenderChild)
  },

  update({ position, display }) {
    const { sprite, group } = display

    sprite.parentGroup = group

    sprite.x = position.x
    sprite.y = position.y
  },
})
