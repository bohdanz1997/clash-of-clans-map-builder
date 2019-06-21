import { detectHit } from '../../services'
import * as c from '../../components'
import * as n from '../../nodes'

export const IdleState = () => ({
  nodes: [n.ClientIdle, n.SourceIdle],

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
