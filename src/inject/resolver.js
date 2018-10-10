import { Keyboard } from '../core/input'
import TileUtils from '../vendor/tileUtilities'
import SpriteUtils from '../vendor/spriteUtilities'
import { PIXI } from '../core/pixi'

export default (config, app) => ({
  $app: app,
  $config: config,
  $keyboard: new Keyboard(config.target),
  $tileUtils: new TileUtils(PIXI),
  $spriteUtils: new SpriteUtils(PIXI),
})
