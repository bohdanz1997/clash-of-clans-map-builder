import { SceneManager } from '.'

/**
 * @param {SceneManager} sceneManager
 * @param {Array} sceneConfig
 */
export default function creator(sceneManager, sceneConfig) {
  const scenes = sceneConfig.map(SceneClass => (
    new SceneClass()
  ))

  scenes.forEach((scene) => {
    sceneManager.add(scene.name, scene)
  })

  sceneManager.start(scenes[0].name)
}
