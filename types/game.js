// @flow
import type { Group } from 'pixi-layers'
import { TileMap } from '../core/tilemap'
import type {
  Rectangle, Point, Sprite, Application, Container,
} from './pixi'

type CameraT = {
  x: number,
  y: number,
  position: Point,
  centerX: number,
  centerY: number,
  follow(sprite: Sprite): void,
  centerOver(sprite: Sprite): void,
}

type PointerT = {
  x: number,
  y: number,
  position: Point,
  centerX: number,
  centerY: number,
  scale: number,
  cursor: any,
  isDown: boolean,
  isUp: boolean,
  tapped: boolean,
  press: SimpleCb,
  release: SimpleCb,
  tap: SimpleCb,
  hoverOver: boolean,
  visible: boolean,
  cartPosition: Point,
  fieldPosition: Point,
}

type SimpleCb = () => void

// components
declare module C {
  declare export type Camera = { camera: CameraT }
  declare export type Control = { dx: number, dy: number }
  declare export type Collision = {
    bounds: Rectangle,
    width: number,
    height: number,
    sizeInCells: number,
  }
  declare export type Damage = { damage: number }
  declare export type Deck = {}
  declare export type DeckItem = {}
  declare export type Display = {
    sprite: Sprite,
    parentId: string,
    group: Group,
    oldGroup: Group,
  }
  declare export type Draggable = {}
  declare export type DragSource = { target: any, offset: Point }
  declare export type EntityMeta = {
    id: string,
    def: string,
    level: number,
    count: number,
  }
  declare export type FSM = { fsm: any }
  declare export type Health = { current: number, max: number }
  declare export type Identity = { id: ?string, seed: number }
  declare export type Interactive = {
    state: string,
    action: string,
    pressed: boolean,
    hoverOver: boolean,
    press: SimpleCb,
    release: SimpleCb,
  }
  declare export type IsoPosition = { pos: Point }
  declare export type Map = { gameField: TileMap }
  declare export type Motion = { vel: Point, damp: Point }
  declare export type MotionControl = { dx: number, dy: number }
  declare export type Overlay = { target: any }
  declare export type OverlayOwner = {}
  declare export type Pointer = { input: PointerT }
  declare export type Position = { pos: Point, fieldPos: Point, offset: Point }
  declare export type ZoomControl = { plus: any, minus: any, smoothZoom: any }

  declare export type HudLayer = {}
  declare export type DragLayer = {}
  declare export type GroundLayer = {}
  declare export type BuildingLayer = {}
  declare export type BackGroundLayer = {}
}

// nodes
declare module N {
  declare export type CameraControlNodeT = {
    camera: C.Camera,
    position: C.Position,
    motion: C.Motion,
    motionControl: C.MotionControl,
    zoomControl: C.ZoomControl,
  }
  declare export type DraggableNodeT = {
    draggable: C.Draggable,
    position: C.Position,
    display: C.Display,
    collision: C.Collision,
    identity: C.Identity,
  }
}
export type MovementNodeT = { position: C.Position, motion: C.Motion }
export type CollisionNodeT = { position: C.Position, collision: C.Collision }
export type RenderNodeT = { position: C.Position, display: C.Display }
export type MapNodeT = { map: C.Map }
export type KeyboardNodeT = { keyboard: Keyboard }
export type InteractiveNodeT = { interactive: C.Interactive, collision: C.Collision }
export type PointerNodeT = { pointer: C.Pointer, dragSource: C.DragSource, identity: C.Identity }
export type IsometricNodeT = { position: C.Position, isoPosition: C.IsoPosition}
export type IsoRenderNodeT = { isoPosition: C.IsoPosition, display: C.Display }
export type OverlayOwnerNodeT = { overlayOwner: C.OverlayOwner, position: C.Position }
export type OverlayNodeT = { overlay: C.Overlay, position: C.Position }
export type HudNodeT = { hud: C.HudLayer, display: C.Display }
export type DeckItemNodeT = { deckItem: C.DeckItem, interactive: C.Interactive, entityMeta: C.EntityMeta }

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
  widthInCells: number,
  heightInCells: number,
  cellsInTile: number,
  cartTileSize: number,
  cartCellSize: number,
  cartWorldWidth: number,
  cartWorldHeight: number,
}

// scent
export type Component = {}
export type Entity = {
  size: number,
  get(componentType: {}): Component,
  has(componentType: {}): boolean,
}
export type Node = {
  size: number,
  each(any): void,
}
export type Engine = {
  addEntity(entity: Entity): void,
  destroyEntity(entity: Entity): void,
  start(): void,
  onUpdate(): void,
  update(time: number): void,
  getNodeType(node: []): Node,
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
  $world: Container,
  $hud: Container,
}

export type EntityFactory = {
  create(id: number, entityData: {}): Entity
}
