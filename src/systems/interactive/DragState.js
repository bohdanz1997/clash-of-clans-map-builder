import * as c from '../../components'
import * as n from '../../nodes'

/**
 * @param {Engine} engine
 * @param {TileMap} map
 * @param {Config} config
 */
export const DragState = ({ engine, map, config }) => ({
  nodes: [n.SourceDragging],

  init(node) {
    node.onAdded(({ entity }) => {
      // console.log('drag start')

      const display = entity.get(c.Display)
      display.oldGroup = display.group
      display.group = config.displayGroups.DRAG

      entity.remove(c.BuildingLayer)
      entity.add(c.DragLayer)
    })

    node.onRemoved(() => {
      // console.log('drag end')
    })

    this.cellSize = map.config.cellWidth
  },

  updateDrag(node) {
    const { client, dragContext, position } = node
    const clientPosition = client.entity.get(c.IsoPosition)
    const sourcePosition = position

    const clientX = clientPosition.col * this.cellSize
    const clientY = clientPosition.row * this.cellSize

    sourcePosition.x = clientX - dragContext.offset.x
    sourcePosition.y = clientY - dragContext.offset.y
  },

  update(node) {
    const { client, entity } = node
    const pointerContext = client.entity.get(c.PointerContext)

    this.updateDrag(node)

    // -> DROP
    if (pointerContext.isUp) {
      entity.remove(c.Dragging)
      entity.add(c.Dropped)
    }
  },
})
