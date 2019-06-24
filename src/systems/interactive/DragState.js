import * as c from '../../components'
import * as n from '../../nodes'
import { states } from '../../fsm'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 * @param {Config} config
 * @param log
 */
export const DragState = ({ engine, map, config, log }) => ({
  nodes: [n.TargetDragging],

  init(nodes) {
    nodes.onAdded((node) => {
      const { entity } = node
      log('drag')

      const display = entity.get(c.Display)
      display.oldGroup = display.group
      display.group = config.displayGroups.DRAG

      entity.remove(c.BuildingLayer)
      entity.add(c.DragLayer)
    })

    this.cellSize = map.config.cellWidth
  },

  updateDrag(node) {
    const { initiator, dragContext, position } = node
    const clientPosition = initiator.entity.get(c.IsoPosition)
    const sourcePosition = position

    const clientX = clientPosition.col * this.cellSize
    const clientY = clientPosition.row * this.cellSize

    sourcePosition.x = clientX - dragContext.offset.x
    sourcePosition.y = clientY - dragContext.offset.y
  },

  update(node) {
    const { initiator, fsm } = node
    const pointerContext = initiator.entity.get(c.PointerContext)

    this.updateDrag(node)

    if (pointerContext.isUp) {
      fsm.fsm.changeState(states.dropped)
    }
  },
})
