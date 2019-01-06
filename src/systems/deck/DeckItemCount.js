import * as c from '@app/components'
import * as n from '@app/nodes'

export default () => ({
  nodes: [n.DeckItem],

  update(node) {
    const { entityMeta, entity } = node

    if (entityMeta.count <= 0) {
      entity.dispose()
    }
  },
})
