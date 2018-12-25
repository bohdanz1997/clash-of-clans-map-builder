export default class SystemManager {
  /**
   * @param container
   * @param engine
   * @param options
   */
  constructor(container, engine, options) {
    this.container = container
    this.engine = engine
    this.defaultPriority = options.defaultPriority || 0

    this.instances = []
  }

  build(Factory) {
    return this.container.build(Factory)
  }

  addToEngine(initializer) {
    this.engine.addSystem(initializer)
  }

  register = (Factory, priority = this.defaultPriority) => {
    const system = this.build(Factory)
    this.instances.push({
      initializer: () => system,
      priority,
    })
  }

  init = () => {
    const byPriority = (a, b) => a.priority - b.priority
    const sorted = this.instances.sort(byPriority)
    sorted.forEach((instance) => {
      this.addToEngine(instance.initializer)
    })
  }
}
