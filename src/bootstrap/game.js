import { Application } from 'core/pixi'
import { createStage } from 'core/renderLayers'

import { createStats } from '../services'
import { viewConfig, gameConfig, inject } from '../config'
import createEngine from './engine'

export default target => () => {
  const app = new Application(gameConfig.pixi)
  app.stage = createStage(viewConfig.groups)
  app.stage.addChild(...viewConfig.containers)
  target.appendChild(app.view)

  const stats = createStats()
  const deps = inject(gameConfig.game, app, target)
  const engine = createEngine(gameConfig.game, deps)
  engine.start()

  app.ticker.add((delta) => {
    stats.begin()
    engine.update(delta)
    stats.end()
  })
}
