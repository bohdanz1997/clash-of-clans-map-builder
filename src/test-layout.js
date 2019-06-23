import { levelRestrictions } from './constants'

const createInventorySlots = (level) => {
  const { conditions } = levelRestrictions.find(x => x.level === level)

  return conditions.map((meta, index) => ({
    id: 'inventoryItem',
    index,
    entityMeta: meta,
  }))
}

export const testLayout = {
  width: 10,
  height: 10,
  layers: [
    {
      name: 'ground',
      data: [
        {
          id: 'background',
          def: 'tile',
          asset: 'ground',
        },
      ],
    },
    {
      name: 'building',
      data: [
        { id: 'building', def: 'clanCastle', cx: 5, cy: 5 },
      ],
    },
    {
      name: 'drag',
      data: [],
    },
    {
      name: 'other',
      data: [
        { id: 'keyboard' },
        { id: 'camera' },
        { id: 'pointer' },
        { id: 'hud', x: 0, y: 0 },
        { id: 'inventory' },
        ...createInventorySlots(9),
      ],
    },
  ],
}
