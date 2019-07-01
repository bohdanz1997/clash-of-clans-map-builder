import { useNodes, onUpdate } from 'core/ecs'
import { keys } from 'core/input'
import * as c from '../components'
import * as e from '../entities'
import * as n from '../nodes'

/**
 * @param {Keyboard} keyboard
 * @param {EntityManager} entities
 */
export const UserInput = ({ keyboard, entities }) => {
  useNodes([n.Pointer, n.InventoryItemSelected, n.Preview])

  const [ESC, CTRL, ENTER] = keyboard.addKeys(keys.ESC, keys.CTRL, keys.ENTER)

  onUpdate((pointers, selectedItems, previews) => {
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
  })
}
