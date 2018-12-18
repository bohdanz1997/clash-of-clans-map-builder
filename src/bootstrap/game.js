import { createEntityBuilder } from 'core'
import { Application } from 'core/pixi'
import { createStage } from 'core/renderLayers'
import { createEngine } from '.'

import {
  createStats,
  createEntityFactory,
} from '../services'

import {
  viewConfig,
  gameConfig,
  appConfig,
  inject,
} from '../config'

const { entityFactories } = appConfig

export default target => () => {
  const app = new Application(gameConfig.pixi)
  app.stage = createStage(viewConfig.groups)
  app.stage.addChild(...viewConfig.containers)
  target.appendChild(app.view)

  const stats = createStats()
  const scope = inject(gameConfig.game, app, target)

  const entityBuilder = createEntityBuilder({
    scope,
    entityFactories,
    entityParamsProvider: x => x,
  })

  scope.$entityFactory = createEntityFactory(entityBuilder)

  const engine = createEngine(scope)
  engine.start()

  app.ticker.add((delta) => {
    stats.begin()
    engine.update(delta)
    stats.end()
  })
}
