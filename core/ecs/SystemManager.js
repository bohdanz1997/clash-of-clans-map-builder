import { Game } from '../boot'
import { createSystem } from './system'
import { initHookProvider } from './system-hooks'

const wrapWithArray = (value) => {
  if (!Array.isArray(value)) {
    return [value]
  }
  return value
}

export class SystemManager {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.container = game.container
    this.engine = game.engine
    this.defaultPriority = game.config.systems.defaultPriority

    this.instances = []
  }

  addToEngine(initializer) {
    this.engine.addSystem(initializer)
  }

  /**
   * @param {Function|Array} Factories
   * @param priority
   * @return {SystemManager}
   */
  add(Factories, priority = this.defaultPriority) {
    Factories = wrapWithArray(Factories)
    Factories.forEach((Factory) => {
      const system = this.build(Factory)
      this.instances.push({
        initializer: () => system,
        priority,
      })
    })

    return this
  }

  /**
   * @param {Function|Array} Factories
   * @param priority
   * @return {SystemManager}
   */
  hook(Factories, priority = this.defaultPriority) {
    Factories = wrapWithArray(Factories)
    Factories.forEach((Factory) => {
      this.instances.push({
        initializer: () => initHookProvider(this.engine, this.container, Factory),
        priority,
      })
    })

    return this
  }

  build(Factory) {
    const systemHandler = this.container.build(Factory)
    return createSystem(systemHandler, this.engine)
  }

  init() {
    const byPriority = (a, b) => a.priority - b.priority
    const sorted = this.instances.sort(byPriority)
    sorted.forEach((instance) => {
      this.addToEngine(instance.initializer)
    })
  }
}
