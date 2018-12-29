import {
  system,
} from 'core'

import { detectHit } from '../../services'
import * as c from '../../components'
import * as n from '../../nodes'

/**
 * @param {Engine} engine
 * @param {EntityManager} entities
 */
export const IdleManager = ({ engine, entities }) => system({
  update(clientNodes, sourceNodes) {
    clientNodes.each((nClient) => {
      sourceNodes.each((nSource) => {
        const eClient = nClient.entity
        const eSource = nSource.entity
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
})(n.Client, n.Source)(engine)
