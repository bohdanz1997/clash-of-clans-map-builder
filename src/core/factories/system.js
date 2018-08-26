import { noop, isFunction } from '../util'

export const createSystem = ({
  onUpdateNode,
  onStartUpdate = noop,
  onEndUpdate = noop,
}) => {
  if (!isFunction(onUpdateNode)) {
    throw new Error(`onUpdateNode must be a function`)
  }
  return (engine, componentTypes) => {
    const node = engine.getNodeType(componentTypes)
    engine.onUpdate(delta => {
      onStartUpdate(delta)
      node.each(item => onUpdateNode(item, delta))
      onEndUpdate(delta)
    })
  }
}

export const createEnhancedSystem = ({
  onUpdate,
}) => {
  if (!isFunction(onUpdate)) {
    throw new Error(`onUpdate must be a function`)
  }
  return (engine, componentTypesList) => {
    const nodes = componentTypesList.map(engine.getNodeType)
    engine.onUpdate(delta => onUpdate(nodes, delta, engine))
  }
}
