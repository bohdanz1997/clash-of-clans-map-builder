import { Application } from 'pixi.js'
import {
  AwilixContainer,
  asFunction,
  asValue,
} from 'awilix'
import { createEntityBuilder } from 'core'
import { Engine } from 'core/scent'
import { Config } from 'core/boot'
import { Scene } from 'core/scenes'
import { TileMapParser } from 'core/tilemap'

import Ignitor from '../Ignitor'
import {
  createEntityFactory,
  createPositioning,
} from '../services'

export default class GameScene extends Scene {
  /**
   * @param {AwilixContainer} container
   */
  constructor(container) {
    super('game')

    /** @type {Engine} */
    this.engine = container.cradle.engine

    /** @type {Ignitor} */
    this.ignitor = container.cradle.ignitor

    /** @type {Application} */
    this.app = container.cradle.app

    /** @type {Config} */
    this.config = container.cradle.config

    const systems = this.ignitor.resolveSystems()
    const mapsDefinitions = this.ignitor.resolveMaps()
    const entityFactories = this.ignitor.resolveEntities()
    const entityDefinitions = this.ignitor.resolveEntityDefinitions()

    const mapParser = new TileMapParser(entityDefinitions)
    const map = mapParser.fromJSON(mapsDefinitions.first)
    map.createLayer('ground', {
      objects: map.createEntitiesForLayer('tile', {}, entityDefinitions.tile),
    })

    const buildEntity = createEntityBuilder({
      container,
      entityFactories,
    })

    const entityFactory = createEntityFactory(buildEntity)

    container.register({
      map: asValue(map),
      entityFactory: asValue(entityFactory),
      world: asValue(this.app.stage.childByName('world')),
      hud: asValue(this.app.stage.childByName('hud')),
      positioning: asValue(createPositioning(this.config, this.app)),
    })

    const xy2World = (params) => {
      if (params.x !== undefined && params.y !== undefined) {
        params.x *= map.config.cellWidth
        params.y *= map.config.cellHeight
      }
      return params
    }

    map.layers.forEach((layer) => {
      layer.objects.forEach((entityData) => {
        const entity = buildEntity(xy2World(entityData), {
          mapConfig: map.config,
        })
        this.engine.addEntity(entity)
      })
    })

    systems.forEach(({ systemHandler }) => {
      const system = container.build(systemHandler)
      this.engine.addSystem(() => system)
    })
  }

  start() {
    console.log('start')
    this.engine.start()
  }

  update(delta) {
    this.engine.update(delta)
  }

  dispose() {
    this.engine = null
    this.ignitor = null
  }
}
