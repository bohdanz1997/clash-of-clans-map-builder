export const randomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1)) + min
)

export const stringifyJSON = data => JSON.stringify(data, null, 2)

let idx = 0
export const uuid = () => ++idx
