export const identity = x => x
export const noop = () => {}
export const isFunction = func => typeof func === 'function'
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
