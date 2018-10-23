export const identity = x => x
export const noop = () => {}
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
