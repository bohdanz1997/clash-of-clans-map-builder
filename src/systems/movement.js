import { createSystem } from '../core/factories'
import { nMovement } from '../nodes'

const onUpdateNode = ({ position, motion, entityRef }, delta) => {
  position.pos = position.pos.add(motion.vel.mult(delta))
}

export default engine => createSystem({
  onUpdateNode,
})(engine, nMovement)
