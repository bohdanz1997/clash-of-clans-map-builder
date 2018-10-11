// @flow
import type {
  Rectangle, Point, Sprite, Application,
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
  worldWidth: number,
  worldHeight: number,
  hWidth: number,
  hHeight: number,
  tileWidth: number,
  tileHeight: number,
  hTileWidth: number,
  hTileHeight: number,
  widthInTiles: number,
  heightInTiles: number,
  cellWidth: number,
  cellHeight: number,
}

export type Engine = {}

export type Node = {
  size: number,
  each(any): void,
}

export type Key = {
  isDown: boolean,
  isUp: boolean,
  enabled: boolean,
  code: number,
}

export type Keyboard = {
  getKey(number): {},
  addKey(number): Key,
  addKeys(...number[]): Key[],
  start(): void,
  destroy(): void,
  update(delta: number): void,
  isUp(): boolean,
  isDown(): boolean,
}

export type Deps = {
  $app: Application,
  $config: GameConfig,
  $keyboard: Keyboard,
}
