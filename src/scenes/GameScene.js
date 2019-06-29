import { asClass, asFunction, asValue } from 'awilix'
import { Scene } from 'core/scenes'
import { TileMapParser } from 'core/tilemap'
import { Align, ContainerBuilder, Helper, EntityDataMapper, Logger, Log } from '../services'
import { priorities } from '../constants'

import * as c from '../components'
import * as s from '../systems'
import * as e from '../entities'

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
      .add('defs', 'entity/definitions.json')
  }

  create() {
    this.entities.postBuild = (entity, id) => entity.add(c.Identity(id))
    this.entities.setDefinitions(this.cache.get('defs'))
    this.entities.setFactories(e)
    this.entities.setBuilder(new ContainerBuilder(this.container))

    const mapParser = new TileMapParser(this.entities.getAllDefinitions())
    const map = mapParser.fromJSON(this.container.resolve('layout'))

    this.container.register({
      map: asValue(map),
      helper: asClass(Helper),
      align: asClass(Align),
      entityDataMapper: asClass(EntityDataMapper),
      world: asValue(this.stage.getChildByName('world')),
      hud: asValue(this.stage.getChildByName('hud')),
      log: asFunction(Log),
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
      .add(s.UpdateDisplayGroup, priorities.PRE_INIT)
      .add(s.Input, priorities.PRE_UPDATE)
      .add(s.Movement, priorities.MOVEMENT)
      .add(s.IsometricMovement, priorities.MOVEMENT)
      .add(s.ChildMovement, priorities.MOVEMENT)
      .add(s.ManagePointers, priorities.MOVEMENT)
      .add(s.CameraControl, priorities.MOVEMENT)
      .add(s.CameraTouchControl, priorities.MOVEMENT)
      .add(s.ManageTweens)
      .add(s.UpdateCollision, priorities.UPDATE_COLLISION)
      .add(s.KeepInBounds, priorities.RESOLVE_COLLISIONS)
      .add(s.PutEntityToMap)
      .add(s.SelectInventoryItem)
      .add(s.UpdateCursorStyle)
      .add(s.Interactive)
      .add(s.DisposeInventoryItemAndPreview, priorities.DISPOSING)
      .add(s.ParentRelationListener, priorities.DISPOSING)
      .add(s.ChildRelationListener, priorities.DISPOSING)
      .add(s.XXXLayer)
      .add(s.InventoryItemCounter)
      .add(s.Render, priorities.RENDER)
      .add(s.IsometricRender, priorities.ISO_RENDER)

    if (this.config.debug) {
      this.systems
        .add(s.Debug)
        .add(s.FPSCounter)
    }

    this.systems.init()
  }
}
