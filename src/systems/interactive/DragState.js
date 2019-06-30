import { useNodes, onNodeAdded, onUpdate, onNodeRemoved } from 'core/ecs'
import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'
import { levels } from '../../config'

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
    log(levels.interact, 'drag')

    entity.remove(c.Layer.Building)
    entity.add(c.Layer.Drag)
  })

  const updateDrag = (node) => {
    const { initiator, dragContext, position } = node
    const clientPosition = initiator.entity.get(c.IsoPosition)

    const clientX = clientPosition.col * cellSize
    const clientY = clientPosition.row * cellSize

    position.x = clientX - dragContext.offset.x
    position.y = clientY - dragContext.offset.y
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

/**
 * @param {Engine} engine
 * @param {TileMap} map
 * @param {Config} config
 * @param log
 */
export const UIDragState = ({ engine, map, config, log }) => {
  useNodes([n.UITargetDragging])

  onNodeAdded((node) => {
    const { entity } = node
    log(levels.interact, 'ui drag')

    entity.remove(c.Layer.UI)
    entity.add(c.Layer.UIDrag)

    node.display.sprite.alpha = 0.5
  })

  onNodeRemoved((node) => {
    node.display.sprite.alpha = 1
  })

  const updateDrag = (node) => {
    const { initiator, dragContext, position } = node
    const clientPosition = initiator.entity.get(c.Position)

    position.x = clientPosition.x - dragContext.offset.x
    position.y = clientPosition.y - dragContext.offset.y
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
