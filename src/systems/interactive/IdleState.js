import { detectHit } from 'app/services'
import * as c from 'app/components'
import * as n from 'app/nodes'

export default () => ({
  nodes: [n.InteractiveClient, n.InteractiveSource],

  update(clientNodes, sourceNodes) {
    clientNodes.each((nClient) => {
      sourceNodes.each((nSource) => {
        const eClient = nClient.entity
        const eSource = nSource.entity

        // -> HOVER
        const hit = detectHit(eClient, eSource)
        if (hit) {
          eClient.remove(c.Idle)
          eSource.remove(c.Idle)

          eSource.add(c.Interact.Client({ entity: eClient }))
          eSource.add(c.Hovered)

          eClient.add(c.Interact.Source({ entity: eSource }))
        }
      })
    })
  },
})
