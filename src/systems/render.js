import { createSystem } from '../core/factories'

import {
  cPosition, cInfo,
} from '../components'

const onStartUpdate = () => {
  console.clear()
}

const onUpdateNode = ({ info, position }, delta) => {
  console.log(info.type, 'x:', position.pos.x, 'y:', position.pos.y, delta)
}

export default engine => createSystem({
  onUpdateNode,
  onStartUpdate,
})(engine, [cPosition, cInfo])
