export const identity = x => x
export const noop = () => {}
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

export const withReducer = reducer => (state, action) => {
  const handler = reducer(state, action)

  if (!handler) {
    throw new Error(`Unrecognized handler for action: ${JSON.stringify(action, null, 2)}`)
  }

  return handler()
}
