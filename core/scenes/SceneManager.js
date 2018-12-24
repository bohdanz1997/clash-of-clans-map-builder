import { Config } from '../boot'
import { Scene } from '.'

export default class SceneManager {
  /**
   * @param {Config} config
   */
  constructor(config) {
    /** @type {Map<string,Scene>} */
    this.scenesMap = new Map()

    /** @type {Scene} */
    this.activeScene = null
  }

  start(name) {
    if (this.scenesMap.has(name)) {
      this.activeScene = this.scenesMap.get(name)
      this.activeScene.start()
    }
  }

  add(name, scene) {
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
