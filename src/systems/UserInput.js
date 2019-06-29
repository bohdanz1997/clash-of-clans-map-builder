import { useNodes, onUpdate } from 'core/ecs'
import { keys } from 'core/input'
import * as c from '../components'
import * as n from '../nodes'

/**
 * @param {Keyboard} keyboard
 */
export const UserInput = ({ keyboard }) => {
  useNodes([n.Pointer, n.InventoryItemSelected, n.Preview])

  const [ESC] = keyboard.addKeys(keys.ESC)

  onUpdate((pointers, selectedItems, previews) => {
    const selectedItem = selectedItems.head
    const pointer = pointers.head
    const preview = previews.head

    if (preview && selectedItem && ESC.justDown) {
      selectedItem.entity.remove(c.Selected)
      pointer.entity.remove(c.Child.Preview)
      preview.entity.dispose()
    }
  })
}
