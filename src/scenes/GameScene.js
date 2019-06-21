import { asClass, asValue } from 'awilix'
import { Scene, TileMapParser } from 'core'
import { Align, ContainerBuilder, Helper, EntityDataMapper } from '../services'
import { priorities } from '../constants'

import * as c from '../components'
import * as s from '../systems'
import * as entities from '../entities'

export class GameScene extends Scene {
  constructor() {
    super('game')
  }

  preload() {
    this.loader
      .add('ground', 'image/ground.png')
      .add('clanCastle', 'image/clanCastle.png')
      .add('goldStorage', 'image/goldStorage.png')
      .add('darkStorage', 'image/darkStorage.png')
      .add('elixirStorage', 'image/elixirStorage.png')
      .add('elixirCollector', 'image/elixirCollector.png')
      .add('wall', 'image/wall.png')
      .add('townhall', 'image/th9.png')
      .add('cat', 'image/cat.png')
      .add('myMap', 'map/first.json')
      .add('defs', 'entity/definitions.json')
  }

  create() {
    this.entities.postBuild = (entity, id) => entity.add(c.Identity(id))
    this.entities.setDefinitions(this.cache.get('defs'))
    this.entities.setFactories(entities)
    this.entities.setBuilder(new ContainerBuilder(this.container))

    const mapParser = new TileMapParser(this.entities.getAllDefinitions())
    const map = mapParser.fromJSON(this.cache.get('myMap'))

    this.container.register({
      map: asValue(map),
      helper: asClass(Helper),
      align: asClass(Align),
      entityDataMapper: asClass(EntityDataMapper),
      world: asValue(this.app.stage.getChildByName('world')),
      hud: asValue(this.app.stage.getChildByName('hud')),
    })

    const { entityDataMapper } = this.container.cradle
    const objects = map.getAllObjects(entityDataMapper.map)
    this.registerEntities(objects)
    this.registerSystems()
  }

  registerEntities(objects) {
    objects.forEach((object) => {
      this.entities.add(object.id, object)
    })
  }

  registerSystems() {
    this.systems
      .add(s.LayerToDisplayGroup, priorities.PRE_INIT)
      .add(s.UpdateKeyboard, priorities.PRE_UPDATE)

      .add(s.Movement, priorities.MOVEMENT)
      .add(s.IsometricMovement, priorities.MOVEMENT)
      .add(s.ManagePointers, priorities.MOVEMENT)
      .add(s.CameraControl, priorities.MOVEMENT)
    // .add(s.CameraTouchControl, priorities.MOVEMENT)

      .add(s.ManageTweens)

      .add(s.UpdateCollision, priorities.UPDATE_COLLISION)
      .add(s.KeepInBounds, priorities.RESOLVE_COLLISIONS)
      .add(s.Debug)
    // .add(s.DebugMapLayers)
      .add(s.InteractWithInventoryItem)
      .add(s.TrackDeckItemCount)

      .add(s.DragDrop)
      .add(s.InteractiveInitializer)
      .add(s.IdleState)
      .add(s.HoverState)
      .add(s.ClickState)
      .add(s.DragState)
      .add(s.DropState)
      .add(s.DropStateListener)

      .add(s.XXXLayer)
      .add(s.ManageOverlays)
      .add(s.Render, priorities.RENDER)
      .add(s.IsometricRender, priorities.ISO_RENDER)

      .init()
  }
}
