import { component } from 'core/ecs'

class InventoryRaw {
  items = []
  selected = null
}

/** @type {InventoryRaw} */
export const Inventory = component('inventory', InventoryRaw)

export const InventoryItem = component('inventoryItem')

export const InventoryCounter = component('inventoryCounter')
