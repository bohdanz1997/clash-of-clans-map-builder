import { system } from 'core/scent'
import * as n from '../nodes'

export const CollisionUpdate = ({ engine }) => system(({ position, collision }) => {
  collision.bounds.setPosition(position.pos)
})(n.Collision)(engine)
