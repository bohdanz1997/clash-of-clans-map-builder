import { Game } from '../boot'
import { createSystem } from './system'

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
   * @param Factory
   * @param priority
   * @return {SystemManager}
   */
  add(Factory, priority = this.defaultPriority) {
    const system = this.build(Factory)
    this.instances.push({
      initializer: () => system,
      priority,
    })

    return this
  }

  build(Factory) {
    const systemHandler = this.container.build(Factory)
    return createSystem(this.engine)(systemHandler)
  }

  init() {
    const byPriority = (a, b) => a.priority - b.priority
    const sorted = this.instances.sort(byPriority)
    sorted.forEach((instance) => {
      this.addToEngine(instance.initializer)
    })
  }
}
