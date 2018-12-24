export const objectEach = (cb, object) => (
  Object.entries(object).forEach(([key, value]) => cb(key, value))
)

export const objectMap = (cb, object) => (
  Object.entries(object).map(([key, value]) => cb(key, value))
)

export const objectReduce = (cb, object) => (
  Object.entries(object).reduce((acc, [key, value]) => cb(acc, key, value), {})
)

/**
 * Retrieve the value at a given paths.
 * @param paths
 * @param obj
 * @returns {*}
 */
export const path = (paths, obj) => {
  let val = obj
  let idx = 0
  while (idx < paths.length) {
    if (val == null) {
      return undefined
    }
    val = val[paths[idx]]
    idx += 1
  }
  return val
}

/**
 * Retrieve the value at a given string path or default value
 * @param {{}} obj
 * @param {string} paths
 * @param {*} defaultValue
 * @returns {*}
 */
export const prop = obj => (paths, defaultValue) => {
  const val = path(paths.split('.'), obj)
  return val || defaultValue
}
