import { useNodes, onUpdate } from 'core/ecs'
import * as n from '../nodes'

export const UpdateCollision = () => {
  useNodes([n.Collision])

  onUpdate(({ position, collision }) => {
    collision.bounds.x = position.x
    collision.bounds.y = position.y
  })
}
