export const interactStates = {
  UP: 'UP',
  OVER: 'OVER',
  DOWN: 'DOWN',
}

export const interactActions = {
  PRESSED: 'PRESSED',
  RELEASED: 'RELEASED',
  NONE: 'NONE',
}

export const priorities = {
  PRE_INIT: 0,
  PRE_UPDATE: 10,
  MOVEMENT: 11,
  UPDATE_COLLISION: 12,
  RESOLVE_COLLISIONS: 13,
  UPDATE: 15,
  PRE_RENDER: 18,
  RENDER: 19,
  ISO_RENDER: 20,
  POST_UPDATE: 25,
}
