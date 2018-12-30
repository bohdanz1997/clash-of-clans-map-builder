import { detectHit } from '@app/services'
import * as c from '@app/components'
import * as n from '@app/nodes'

/**
 * @param {Engine} engine
 * @param {EntityManager} entities
 */
export default ({ engine, entities }) => ({
  nodes: [n.Client, n.Source],

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

          const eObserver = entities.add('observer', {
            client: eClient,
            source: eSource,
          })

          eObserver.add(c.Hovered)
        }
      })
    })
  },
})
