import { createSystem } from '../core/factories'
import { nObjectsLayer } from '../nodes'

export default $engine => createSystem({
  init(node) {
    node.each(console.log)
  },
})(nObjectsLayer)($engine)

export const params = {
  enabled: false,
}
