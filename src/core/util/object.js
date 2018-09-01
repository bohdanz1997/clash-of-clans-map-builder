export const objectEach = (cb, object) => (
  Object.entries(object).forEach(([key, value]) => cb(key, value))
)

export const objectMap = (cb, object) => (
  Object.entries(object).map(([key, value]) => cb(key, value))
)

export const objectReduce = (cb, object) => (
  Object.entries(object).reduce((acc, [key, value]) => cb(acc, key, value), {})
)
