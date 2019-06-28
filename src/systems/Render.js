import { onNodeAdded, onNodeRemoved, onUpdate, useNodes } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'

export const Render = ({ world, hud }) => {
  useNodes([n.Render])

  const layersToContainers = [
    [c.Layer.Ground, world],
    [c.Layer.BackGround, world],
    [c.Layer.Building, world],
    [c.Layer.Drag, world],
    [c.Layer.Hud, hud],
    [c.Layer.Debug, hud],
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

  onNodeAdded((node) => {
    const container = findContainerByLayerComponent(node)
    container.addChild(node.display.sprite)
  })

  onNodeRemoved((node) => {
    const container = findContainerByLayerComponent(node)
    container.removeChild(node.display.sprite)
  })

  onUpdate((node) => {
    const { position, display } = node
    display.sprite.x = position.x
    display.sprite.y = position.y
  })
}
