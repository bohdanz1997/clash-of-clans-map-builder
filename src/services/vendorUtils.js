import { Bump, Tink, Smoothie, GameUtils, TileUtils, SpriteUtils } from 'game-modules'
import { PIXI } from '../core/pixi'

/** @type {GameUtilities} */
export const gameUtils = new GameUtils()

/** @type {TileUtilities} */
export const tileUtils = new TileUtils(PIXI)

/** @type {SpriteUtilities} */
export const spriteUtils = new SpriteUtils(PIXI)

/** @type {Bump} */
export const bump = new Bump(PIXI)

/** @type {Tink} */
export const tink = new Tink(PIXI)
