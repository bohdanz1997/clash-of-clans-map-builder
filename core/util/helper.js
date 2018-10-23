export const randomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1)) + min
)

export const stringifyJSON = data => JSON.stringify(data, null, 2)
