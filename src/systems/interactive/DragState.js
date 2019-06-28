import { useNodes, onNodeAdded, onUpdate } from 'core/ecs'
import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 * @param {Config} config
 * @param log
 */
export const DragState = ({ engine, map, config, log }) => {
  const cellSize = map.config.cellWidth

  useNodes([n.TargetDragging])

  onNodeAdded((node) => {
    const { entity } = node
    log('drag')

    entity.remove(c.Layer.Building)
    entity.add(c.Layer.Drag)
  })

  const updateDrag = (node) => {
    const { initiator, dragContext, position } = node
    const clientPosition = initiator.entity.get(c.IsoPosition)
    const sourcePosition = position

    const clientX = clientPosition.col * cellSize
    const clientY = clientPosition.row * cellSize

    sourcePosition.x = clientX - dragContext.offset.x
    sourcePosition.y = clientY - dragContext.offset.y
  }

  onUpdate((node) => {
    const { initiator, fsm } = node
    const pointerContext = initiator.entity.get(c.PointerContext)

    updateDrag(node)

    if (pointerContext.isUp) {
      fsm.fsm.changeState(states.dropped)
    }
  })
}
