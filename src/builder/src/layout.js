import { uuid } from 'core/util'
import { levelRestrictions } from './constants'

const createInventorySlots = (level) => {
  const { conditions } = levelRestrictions.find(x => x.level === level)

  return conditions.map((meta, index) => ({
    id: 'inventoryItem',
    index,
    entityMeta: meta,
  }))
}

export const layersDefaults = {
  width: 15,
  height: 15,
  other: [
    { id: 'input' },
    { id: 'camera' },
    { id: 'pointer' },
    { id: 'inventory' },
  ],
  ground: [
    {
      id: 'background',
      def: 'tile',
      asset: 'ground',
    }
  ],
}

export const testLayout = {
  id: uuid(),
  name: 'Test',
  level: 9,
  width: layersDefaults.width,
  height: layersDefaults.height,
  layers: [
    {
      name: 'ground',
      data: layersDefaults.ground,
    },
    {
      name: 'building',
      data: [
        { id: 'box', x: 200, y: 400, width: 100, height: 100 },
      ],
    },
    {
      name: 'drag',
      data: [],
    },
    {
      name: 'other',
      data: [
        ...layersDefaults.other,
        ...createInventorySlots(9),
      ],
    },
  ],
}
