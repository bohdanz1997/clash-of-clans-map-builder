import { asFunction, asValue } from 'awilix'

import {
  Scene,
  TileMap,
  AnimatedSprite,
  createEntity,
} from 'core'

import { createPositioning, ContainerBuilder, withDisplay } from '../services'
import { priorities } from '../constants'

import * as s from '../systems'
import * as c from '../components'
import * as entities from '../entities'

export class SandboxScene extends Scene {
  constructor() {
    super('sandbox')
  }

  preload() {
    this.loader.add('man', 'atlas/man.json')
    this.loader.add('defs', 'entity/definitions.json')
  }

  create() {
    this.entities.setBuilder(new ContainerBuilder(this.container))
    this.entities.setDefinitions(this.cache.get('defs'))
    this.entities.setFactories(entities)

    const map = new TileMap({ width: 10, height: 10 })

    this.entities.make('man', [
      c.Position(this.game.align.center(0, 0, 100, 100)),
      c.Display(withDisplay.animatedSprite({
        atlas: this.cache.getResource('man'),
        speed: 0.1,
      })),
      c.Animatable(),
    ])

    this.entities.add('pointer')
    this.entities.add('hud')

    this.container.register({
      map: asValue(map),
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

    register(s.DragDrop)
    register(s.InteractiveIdleState)
    register(s.InteractiveHoverState)
    register(s.InteractiveDragState)
    register(s.InteractiveDropState)

    register(s.PointerManager)
    register(s.Debug)
    register(s.Movement)
    register(s.Animation)
    register(s.Render)

    init()
  }
}
