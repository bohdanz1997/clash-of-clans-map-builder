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
  ground: [{
    id: 'background',
    def: 'tile',
    asset: 'ground',
  }],
}

export const testLayout = {
  width: layersDefaults.width,
  height: layersDefaults.height,
  layers: [
    {
      name: 'ground',
      data: layersDefaults.ground,
    },
    {
      name: 'building',
      data: [],
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
