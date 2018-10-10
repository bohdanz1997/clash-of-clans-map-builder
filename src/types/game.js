// @flow
import type {
  Rectangle, Point, Sprite,
} from './pixi'

// components
export type Position = { pos: Point }
export type Motion = { vel: Point }
export type Control = { dx: number, dy: number }
export type Damage = { damage: number }
export type Health = { current: number, max: number }
export type Collision = { bounds: Rectangle, width: number, height: number }
export type Display = { sprite: Sprite }

// nodes
export type MovementNode = { position: Position, motion: Motion }
export type RenderNode = { position: Position, display: Display }

export type GameConfig = {
  width: number,
  height: number,
  hWidth: number,
  hHeight: number,
  tileWidth: number,
  tileHeight: number,
  hTileWidth: number,
  hTileHeight: number,
  widthInTiles: number,
  heightInTiles: number,
  target: HTMLBodyElement,
}

export type Engine = {}
