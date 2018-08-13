export const createSystem = onUpdateNode => (engine, componentTypes) => {
  const node = engine.getNodeType(componentTypes)
  engine.onUpdate(timestamp => node.each(onUpdateNode, timestamp))
}
