export const createComponent = (ComponentType, params = {}) => {
  const component = new ComponentType()
  Object.entries(params).forEach(([name, value]) => {
    component[name] = value
  })
  return component
}
