import { useNodes, onUpdate } from 'core/ecs'
import { keys } from 'core/input'
import * as c from '../components'
import * as e from '../entities'
import * as n from '../nodes'

/**
 * @param {Keyboard} keyboard
 * @param {EntityManager} entities
 * @param {PIXI.utils.EventEmitter} events
 */
export const UserInput = ({ keyboard, entities, events }) => {
  useNodes([n.Pointer, n.InventoryItemSelected, n.Preview, n.Range])

  const [ESC, CTRL, ENTER] = keyboard.addKeys(keys.ESC, keys.CTRL, keys.ENTER)
  const [W, S, A, D] = keyboard.addKeys(keys.UP, keys.DOWN, keys.LEFT, keys.RIGHT)

  const enableRangesMovement = (ranges) => {
    const speed = 1
    if (W.isDown) {
      ranges.each((range) => {
        range.display.sprite.pivot.y += speed
      })
    }
    if (S.isDown) {
      ranges.each((range) => {
        range.display.sprite.pivot.y -= speed
      })
    }
    if (A.isDown) {
      ranges.each((range) => {
        range.display.sprite.pivot.x += speed
      })
    }
    if (D.isDown) {
      ranges.each((range) => {
        range.display.sprite.pivot.x -= speed
      })
    }
  }

  events.on('save-layout', () => {
    entities.add(e.Serializer)
  })

  onUpdate((pointers, selectedItems, previews, ranges) => {
    const selectedItem = selectedItems.head
    const pointer = pointers.head
    const preview = previews.head

    if (preview && selectedItem && ESC.justDown) {
      selectedItem.entity.remove(c.Selected)
      pointer.entity.remove(c.Child.Preview)
      preview.entity.dispose()
    }

    if (CTRL.isDown && ENTER.justDown) {
      entities.add(e.Serializer)
    }

    // enableRangesMovement(ranges)
  })
}
