import { createSystem } from '../core/factories'
import { nRender } from '../nodes'

export default $engine => createSystem({
  before() {
    console.clear()
  },

  update({ info, position }, delta) {
    console.log(info.entityType, position.pos.toString(), delta)
  }
})(nRender)($engine)
