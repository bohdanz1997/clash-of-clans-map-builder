import { createSystem } from '../core/factories'

import {
  cMotion,
  cPosition
} from '../components'

const onUpdateNode = ({ position, motion }, delta) => {
  position.pos = position.pos.add(motion.vel.mult(delta))
}

export default engine => createSystem({
  onUpdateNode,
})(engine, [cPosition, cMotion])
