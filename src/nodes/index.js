import * as c from '../components'

// control
export const CameraControl = [
  c.Camera,
  c.Position,
  c.Motion,
  c.MotionControl,
  c.ZoomControl,
]

/**
 @typedef {Object} Movement
 @property {PositionRaw} position
 */
export const Movement = [c.Position, c.Motion]
export const Isometric = [c.Position, c.IsoPosition]

export const Collision = [c.Position, c.Collision]
export const Render = [c.Position, c.Display]
export const Map = [c.Map]
export const Building = [c.Building, c.Position, c.Identity]
export const Keyboard = [c.Keyboard]
export const IsoRender = [c.IsoPosition, c.Display]
export const OverlayOwner = [c.OverlayOwner, c.Position, c.Collision]
export const Overlay = [c.Overlay, c.Position]
export const Hud = [c.HudLayer, c.Display]
export const Animation = [c.Animatable, c.Display]

// deck
export const DeckItem = [c.DeckItem, c.EntityMeta]
export const DeckItemClicked = [c.DeckItem, c.Clicked, c.Interact.Client, c.EntityMeta]

export const Pointer = [c.PointerContext, c.Position, c.IsoPosition]

export const ClientInitializer = [c.PointerContext]
export const SourceInitializer = [c.Interactive]

export const InteractiveClient = [c.PointerContext, c.Idle, c.Position, c.IsoPosition]
export const InteractiveSource = [c.Interactive, c.Idle, c.Collision]

// client interaction
export const PointerInteracts = [c.Interact.Source, c.PointerContext]

// source interaction
export const SourceHovered = [c.Hovered, c.Interact.Client]
export const SourceClicked = [c.Clicked, c.Interact.Client, c.Position]
export const SourceDragging = [c.Dragging, c.DragContext, c.Interact.Client, c.Position]
export const SourceDropped = [c.Dropped, c.DragContext, c.Display]

export const SourceDroppedListener = [c.Dropped, c.DragContext, c.Position, c.Collision]


export const Tween = [c.Tween]

// layers
export const Layers = {
  Ground: [c.GroundLayer, c.Display],
  BackGround: [c.BackGroundLayer, c.Display],
  Building: [c.BuildingLayer, c.Display],
  Drag: [c.DragLayer, c.Display],
  Hud: [c.HudLayer, c.Display],
}

// map layers
export const MapLayers = {
  Building: [c.BuildingLayer, c.Identity, c.Position, c.Collision],
  Drag: [c.DragLayer, c.Identity, c.Position, c.Collision],
}
