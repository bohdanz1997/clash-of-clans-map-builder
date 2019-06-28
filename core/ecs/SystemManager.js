import { Game } from '../boot'
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
      this.instances.push({
        initializer: () => initHookProvider(this.engine, this.container, Factory),
        priority,
      })
    })

    return this
  }

  init() {
    const byPriority = (a, b) => a.priority - b.priority
    const sorted = this.instances.sort(byPriority)
    sorted.forEach((instance) => {
      this.addToEngine(instance.initializer)
    })
  }
}
