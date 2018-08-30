import { createSystem } from '../core/factories'
import { nRender } from '../nodes'

const handler = {
  before() {
    console.clear()
  },

  update({ info, position }, delta) {
    console.log(info.entityType, position.pos.toString(), delta)
  }
}

export default createSystem(handler)(nRender)
