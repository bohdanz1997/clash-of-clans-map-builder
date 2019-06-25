import { asClass, asValue } from 'awilix'
import { Scene } from 'core/scenes'
import { TileMap } from 'core/tilemap'
import { DisplayFactory } from 'core/display'

import * as s from '../systems'
import * as c from '../components'
import * as entities from '../entities'
import { Align, ContainerBuilder } from '../services'

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
      c.Display(DisplayFactory.animatedSprite({
        atlas: this.cache.getResource('man'),
        speed: 0.1,
      })),
      c.Animatable(),
    ])

    this.entities.add('pointer')
    this.entities.add('hud')

    this.container.register({
      map: asValue(map),
      world: asValue(this.stage.getChildByName('world')),
      hud: asValue(this.stage.getChildByName('hud')),
      positioning: asClass(Align),
    })

    this.registerEntities(map)
    this.registerSystems()
  }

  registerEntities(map) {

  }

  registerSystems() {
    this.systems
      .add(s.IdleState)
      .add(s.HoverState)
      .add(s.DragState)
      .add(s.DropState)

      .add(s.ManagePointers)
      .add(s.Debug)
      .add(s.Movement)
      .add(s.Animation)
      .add(s.Render)

      .init()
  }
}
