import { keys } from '..'

export const makeWASDKeys = (keyboard) => {
  const [up, down, left, right] = keyboard.addKeys(keys.W, keys.S, keys.A, keys.D)
  return {
    up, down, left, right,
  }
}

export const makeArrowKeys = (keyboard) => {
  const [up, down, left, right] = keyboard.addKeys(keys.UP, keys.DOWN, keys.LEFT, keys.RIGHT)
  return {
    up, down, left, right,
  }
}
