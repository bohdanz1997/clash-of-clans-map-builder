import { asFunction, asValue } from 'awilix'

import {
  Scene,
  TileMap,
  AnimatedSprite,
  createEntity,
} from 'core'

import { createPositioning, withDisplay } from '../services'
import { priorities } from '../constants'

import * as s from '../systems'
import * as c from '../components'
import * as entities from '../entities'

const containerBuilder = container => (factory, data, dataForInject) => {
  const injector = () => ({
    data,
    ...dataForInject,
  })
  const resolver = asFunction(factory).inject(injector)
  return container.build(resolver)
}

export default class GameScene extends Scene {
  constructor() {
    super('sandbox')
  }

  preload() {
    this.loader.add('man', 'atlas/man.json')
  }

  create() {
    this.entities.setBuilder(containerBuilder(this.container))

    const map = new TileMap({ width: 10, height: 10 })

    const entity = createEntity(
      c.Position(this.game.align.center(0, 0, 100, 100)),
      c.Display(withDisplay.animatedSprite({
        atlas: this.cache.getResource('man'),
        speed: 0.1,
      })),
      c.Animatable(),
    )
    this.engine.addEntity(entity)

    this.container.register({
      map: asValue(map),
      entityFactory: asValue(this.entities),
      world: asValue(this.app.stage.getChildByName('world')),
      hud: asValue(this.app.stage.getChildByName('hud')),
      positioning: asValue(createPositioning(this.config, this.app)), // align
    })

    this.registerEntities(map)
    this.registerSystems()
  }

  registerEntities(map) {

  }

  registerSystems() {
    const { register, init } = this.systems

    register(s.Movement)
    register(s.Animation)
    register(s.Render)

    init()
  }
}