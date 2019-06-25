export const priorities = {
  PRE_INIT: 0,
  PRE_UPDATE: 10,
  MOVEMENT: 11,
  UPDATE_COLLISION: 12,
  RESOLVE_COLLISIONS: 13,
  UPDATE: 15,
  DISPOSING: 17,
  PRE_RENDER: 18,
  RENDER: 19,
  ISO_RENDER: 20,
  POST_UPDATE: 25,
}

export const levelRestrictions = [
  { level: 1, conditions: [] },
  { level: 2, conditions: [] },
  { level: 3, conditions: [] },
  {
    level: 9,
    conditions: [
      {
        id: 'wall',
        def: 'wall',
        count: 250,
      },
      {
        id: 'building',
        def: 'townhall',
        count: 1,
      },
      {
        id: 'building',
        def: 'clanCastle',
        count: 1,
      },
      {
        id: 'building',
        def: 'goldStorage',
        count: 4,
      },
      {
        id: 'building',
        def: 'elixirCollector',
        count: 4,
      },
    ],
  },
]
