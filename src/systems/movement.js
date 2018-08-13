import { createSystem } from "../core/factories"

import {
  cMotion,
  cPosition
} from '../components'

export default engine => () => {
  createSystem(({ position, motion }) => {
    position.pos.add(motion.vel)
    console.log(position)
    console.log(motion)
  })(engine, [cPosition, cMotion])
}
