import { createSystem } from "../core/factories"

import {
  cMotion,
  cControl,
} from '../components'

export default engine => () => {
  createSystem(({ control }) => {
    position.pos.add(motion.vel)
    console.log(motion)
  })(engine, [cControl, cMotion])
}
