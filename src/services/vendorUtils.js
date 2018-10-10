import { PIXI } from '../core/pixi'

import GameUtils from '../vendor/gameUtils'
import TileUtils from '../vendor/tileUtilities'
import SpriteUtils from '../vendor/spriteUtilities'

export const gameUtils = new GameUtils()
export const tileUtils = new TileUtils(PIXI)
export const spriteUtils = new SpriteUtils(PIXI)
