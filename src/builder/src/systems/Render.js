import { Rectangle } from 'pixi.js'
import { onNodeAdded, onNodeRemoved, onUpdate, useNodes } from 'core/ecs'
import { CollisionChecker } from 'core/collision'
import * as c from '../components'
import * as n from '../nodes'

/**
 * @param {PIXI.Container} world
 * @param {PIXI.Container} hud
 * @param {PIXI.Renderer} renderer
 */
export const Render = ({ world, hud, renderer }) => {
  useNodes([n.Render])

  const screenBounds = renderer.screen
  const layersToContainers = [
    [c.Layer.Ground, world],
    [c.Layer.BackGround, world],
    [c.Layer.Building, world],
    [c.Layer.Drag, world],
    [c.Layer.Hud, hud],
    [c.Layer.UI, hud],
    [c.Layer.UIDrag, hud],
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
    const { position, display: { sprite } } = node
    sprite.x = position.x
    sprite.y = position.y

    // disable rendering when sprite is outside screen
    const spriteBounds = new Rectangle(sprite.x, sprite.y, sprite.width, sprite.height)
    sprite.visible = !CollisionChecker.rectToRect(screenBounds, spriteBounds);
  })
}
