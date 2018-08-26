import { createSystem } from '../core/factories'
import { nRender } from '../nodes'

const onStartUpdate = () => {
  console.clear()
}

const onUpdateNode = ({ info, position }, delta) => {
  console.log(info.type, position.pos.toString(), delta)
}

export default engine => createSystem({
  onUpdateNode,
  onStartUpdate,
})(engine, nRender)
