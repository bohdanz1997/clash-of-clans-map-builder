import { useNodes, onUpdate } from 'core/ecs'
import * as n from '../nodes'

export const Animation = () => {
  useNodes([n.Animation])

  onUpdate((node, delta) => {
    node.display.sprite.update(delta)
  })
}
