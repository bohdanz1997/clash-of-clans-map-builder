export default (sceneManager, sceneConfig, container) => {
  const scenes = sceneConfig.map(SceneClass => (
    new SceneClass(container)
  ))

  scenes.forEach((scene) => {
    sceneManager.add(scene.name, scene)
  })

  sceneManager.start(scenes[0].name)
}
