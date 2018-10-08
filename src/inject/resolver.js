import { Keyboard } from '../core/input'
import { createLogger } from '../core'
import TileUtils from '../vendor/tileUtilities'
import { PIXI } from '../core/pixi'

export default (config, app) => ({
  $app: app,
  $config: config,
  $createLogger: createLogger,
  $keyboard: new Keyboard(config.target),
  $tileUtils: new TileUtils(PIXI),
})
