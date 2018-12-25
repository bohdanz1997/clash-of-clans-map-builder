import { Game } from '../boot'
import { Scene } from '.'
import injections from './injections'

export default class SceneManager {
  /**
   * @param {Game} game
   */
  constructor(game) {
    /** @type {Map<string,Scene>} */
    this.scenesMap = new Map()

    /** @type {Scene} */
    this.activeScene = null

    this.game = game

    game.events.on('boot', this.preload)
    game.events.on('start', this.create)
  }

  applyInjectionsToScene(scene) {
    injections.forEach((injection) => {
      switch (injection) {
        case 'game':
          scene.game = this.game
          break
        case 'container':
          scene.container = this.game.container
          break
        default:
          scene[injection] = this.game.container.resolve(injection)
      }
    })
  }

  preload = () => {
    this.scenesMap.forEach((scene) => {
      scene.preload()
    })
  }

  create = () => {
    this.scenesMap.forEach((scene) => {
      scene.create()
    })
  }

  start(name) {
    if (this.scenesMap.has(name)) {
      this.activeScene = this.scenesMap.get(name)
    }
  }

  add(name, scene) {
    this.applyInjectionsToScene(scene)
    this.scenesMap.set(name, scene)
  }

  remove(name) {
    this.scenesMap.delete(name)
  }

  update(delta) {
    this.activeScene.update(delta)
  }

  destroy() {
    this.activeScene = null

    this.scenesMap.forEach((scene) => {
      scene.destroy()
    })
    this.scenesMap.clear()
  }
}
