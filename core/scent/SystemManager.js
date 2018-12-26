import { Game } from '../boot'

export default class SystemManager {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.container = game.container
    this.engine = game.engine
    this.defaultPriority = game.config.systems.defaultPriority

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
