import { SceneManager } from '.'
import { Game } from '../boot'

/**
 * @param {SceneManager} sceneManager
 * @param {Array} sceneConfig
 * @param {Game} game
 */
export default function creator(sceneManager, sceneConfig, game) {
  const scenes = sceneConfig.map(SceneClass => (
    new SceneClass(game)
  ))

  scenes.forEach((scene) => {
    sceneManager.add(scene.name, scene)
  })

  sceneManager.start(scenes[0].name)
}
