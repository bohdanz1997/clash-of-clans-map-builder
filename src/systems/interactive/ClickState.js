import { useNodes, onNodeAdded, onUpdate } from 'core/ecs'
import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'

/**
 * @param {TileMap} map
 * @param {Helper} helper
 * @param log
 */
export const ClickState = ({ map, helper, log }) => {
  useNodes([n.TargetClicked])

  onNodeAdded(() => {
    log('click')
  })

  onUpdate((node) => {
    const { initiator, fsm, entity, position } = node

    if (entity.has(c.Draggable)) {
      const clientPosition = initiator.entity.get(c.IsoPosition)
      const { startPos, offset } = helper.prepareDrag(clientPosition, position)

      fsm.fsm.changeState(states.dragging, {
        startPos,
        offset,
      })
    } else {
      fsm.fsm.changeState(states.hovered)
    }
  })
}
