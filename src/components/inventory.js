import { defComponent } from 'core/scent'

class InventoryRaw {
  items = []
  selected = null
}

/** @type {InventoryRaw} */
export const Inventory = defComponent('inventory', InventoryRaw)

export const InventoryItem = defComponent('inventoryItem')
