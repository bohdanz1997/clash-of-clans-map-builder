import { Application } from 'core/pixi'
import { spriteUtils } from 'core/tools'
import createEngine from './engine'
import { resolver } from './inject'
import { createStats, resourceLoader } from './services'
import { gameConfig, appOpts, targetEl } from './gameConfig'

const setup = target => () => {
  const app = new Application(appOpts)
  const childContainers = [
    spriteUtils.group('world'),
    spriteUtils.group('hud'),
  ]

  app.stage.addChild(...childContainers)
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
