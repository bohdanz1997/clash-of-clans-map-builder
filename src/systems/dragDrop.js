import { system } from 'core/scent'

import * as c from '../components'
import * as n from '../nodes'

export const DragDrop = ({ engine }) => system('pointerHoverSystem', {
  init(nodes) {
    nodes.onAdded((node) => {
      const ePointer = node.client.entity
      ePointer.get(c.Pointer).input.hoverOver = true
    })
    nodes.onRemoved((node) => {
      const ePointer = node.client.entity
      ePointer.get(c.Pointer).input.hoverOver = false
    })
  },
})(n.Observer)(engine)
