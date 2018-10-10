import createEngine from './engine'
import { resolver } from './inject'
import { gameConfig } from './gameConfig'
import { Application } from './core/pixi'
import { createStats, resourceLoader } from './services'

const setup = target => () => {
  const app = new Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    width: gameConfig.width,
    height: gameConfig.height,
  })

  target.appendChild(app.view)

  const stats = createStats()
  const dependencies = resolver(gameConfig, app, target)
  const engine = createEngine(gameConfig, dependencies)
  engine.start()

  app.ticker.add((delta) => {
    stats.begin()
    engine.update(delta)
    stats.end()
  })
}

resourceLoader(setup(document.body))
