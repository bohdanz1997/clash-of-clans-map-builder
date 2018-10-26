import { Application, Container } from 'core/pixi'
import createEngine from './engine'
import { resolver } from './inject'
import { gameConfig, targetEl } from './gameConfig'
import { createStats, resourceLoader } from './services'

const setup = target => () => {
  const app = new Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    width: gameConfig.width,
    height: gameConfig.height,
  })

  const world = new Container()
  world.name = 'world'
  app.stage.addChild(world)
  target.appendChild(app.view)

  const stats = createStats()
  const deps = resolver(gameConfig, app, target)
  const engine = createEngine(gameConfig, deps)
  engine.start()

  app.ticker.add((delta) => {
    stats.begin()
    engine.update(delta)
    stats.end()
  })
}

resourceLoader(setup(targetEl))
