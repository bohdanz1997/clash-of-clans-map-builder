import {
  asValue,
} from 'awilix'
import { createEntityBuilder } from 'core'
import { Game } from 'core/boot'
import { Scene } from 'core/scenes'
import { TileMapParser } from 'core/tilemap'

import Ignitor from '../Ignitor'
import {
  createEntityFactory,
  createPositioning,
} from '../services'

export default class GameScene extends Scene {
  /**
   * @param {Game} game
   */
  constructor(game) {
    super('game')

    this.game = game
  }

  preload() {
    this.game.loader
      .add('ground', 'assets/image/ground.png')
      .add('clanCastle', 'assets/image/clanCastle.png')
      .add('goldStorage', 'assets/image/goldStorage.png')
      .add('elixirCollector', 'assets/image/elixirCollector.png')
  }

  create() {
    const { container, engine, app, config } = this.game

    /** @type {Ignitor} */
    const ignitor = container.resolve('ignitor')

    const systems = ignitor.resolveSystems()
    const mapsDefinitions = ignitor.resolveMaps()
    const entityFactories = ignitor.resolveEntities()
    const entityDefinitions = ignitor.resolveEntityDefinitions()

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
      world: asValue(app.stage.childByName('world')),
      hud: asValue(app.stage.childByName('hud')),
      positioning: asValue(createPositioning(config, app)),
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
        engine.addEntity(entity)
      })
    })

    systems.forEach(({ systemHandler }) => {
      const system = container.build(systemHandler)
      engine.addSystem(() => system)
    })
  }

  registerSystems() {
    
  }
}
