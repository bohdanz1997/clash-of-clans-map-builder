import { asFunction, asValue } from 'awilix'

import {
  Scene,
  TileMapParser,
} from 'core'

import { createPositioning } from '../services'
import { priorities } from '../constants'

import * as s from '../systems'
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
    super('game')
  }

  preload() {
    this.loader
      .add('ground', 'image/ground.png')
      .add('clanCastle', 'image/clanCastle.png')
      .add('goldStorage', 'image/goldStorage.png')
      .add('elixirCollector', 'image/elixirCollector.png')
      .add('myMap', 'map/first.json')
      .add('entityDefinitions', 'entity/definitions.json')
  }

  create() {
    this.entities.setDefinitions(this.cache.get('entityDefinitions'))
    this.entities.setFactories(entities)
    this.entities.setBuilder(containerBuilder(this.container))

    const mapParser = new TileMapParser(this.entities.getAllDefinitions())
    const map = mapParser.fromJSON(this.cache.get('myMap'))
    const tileData = this.entities.getDefinition('tile')

    map.createLayer('ground', {
      objects: map.createEntitiesForLayer('tile', {}, tileData),
    })

    this.container.register({
      map: asValue(map),
      entityFactory: asValue(this.entities),
      world: asValue(this.app.stage.getChildByName('world')),
      hud: asValue(this.app.stage.getChildByName('hud')),
      positioning: asValue(createPositioning(this.config, this.app)),
    })

    this.registerEntities(map)
    this.registerSystems()
  }

  registerEntities(map) {
    const xy2World = (params) => {
      if (params.x !== undefined && params.y !== undefined) {
        params.x *= map.config.cellWidth
        params.y *= map.config.cellHeight
      }
      return params
    }

    map.layers.forEach((layer) => {
      layer.objects.forEach((entityData) => {
        this.entities.add(entityData.id, xy2World(entityData))
      })
    })
  }

  registerSystems() {
    const { register, init } = this.systems

    register(s.StagePrepare, priorities.PRE_INIT)
    register(s.KeyboardManager, priorities.PRE_UPDATE)
    register(s.Movement, priorities.MOVEMENT)
    register(s.CameraControl, priorities.MOVEMENT)
    // register(s.CameraTouchControl, priorities.MOVEMENT)
    register(s.CollisionUpdate, priorities.UPDATE_COLLISION)
    register(s.BoundsLimiter, priorities.RESOLVE_COLLISIONS)
    register(s.Debug)
    // register(s.DebugMapLayers)
    register(s.DeckManager)

    register(s.DragDrop)
    register(s.InteractiveIdleState)
    register(s.InteractiveHoverState)
    register(s.InteractiveDragState)
    register(s.InteractiveDropState)
    register(s.InteractiveDropStateListener)

    register(s.TileMapManager)
    register(s.OverlayManager)
    register(s.PointerManager)
    register(s.IsoMovement, priorities.PRE_RENDER)
    register(s.Render, priorities.RENDER)
    register(s.IsoRender, priorities.ISO_RENDER)

    init()
  }
}
