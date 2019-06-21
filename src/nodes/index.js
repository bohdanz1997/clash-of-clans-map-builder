import * as c from '../components'

/**
 @typedef {Object} Movement
 @property {PositionRaw} position
 */

// movement
export const Movement = [c.Position, c.Motion]
export const Isometric = [c.Position, c.IsoPosition]

// render
export const Render = [c.Position, c.Display]
export const IsoRender = [c.IsoPosition, c.Display]

// overlay
export const OverlayOwner = [c.OverlayOwner, c.Position, c.Collision]
export const Overlay = [c.Overlay, c.Position]

// deck
export const DeckItem = [c.DeckItem, c.EntityMeta]
export const DeckItemClicked = [c.DeckItem, c.Clicked, c.Interact.Initiator, c.EntityMeta]

// pointer
export const Pointer = [c.PointerContext, c.Position, c.IsoPosition]
export const PointerContext = [c.PointerContext]
export const PointerInteracts = [c.PointerContext, c.Interact.Target]

// interaction
export const Interactive = [c.Interactive]
export const InitiatorIdle = [c.Idle, c.PointerContext, c.Position, c.IsoPosition]
export const TargetIdle = [c.Idle, c.Interactive, c.Collision]
export const TargetHovered = [c.Hovered, c.Interact.Initiator]
export const TargetClicked = [c.Clicked, c.Interact.Initiator, c.Position]
export const TargetDragging = [c.Dragging, c.DragContext, c.Interact.Initiator, c.Position]
export const TargetDropped = [c.Dropped, c.DragContext, c.Display]

// interaction listeners
export const TargetDroppedListener = [c.Dropped, c.DragContext, c.Position, c.Collision]

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

// other
export const CameraControl = [c.Camera, c.Position, c.Motion, c.MotionControl, c.ZoomControl]
export const Collision = [c.Position, c.Collision]
export const Map = [c.Map]
export const Building = [c.Building, c.Position, c.Identity]
export const Keyboard = [c.Keyboard]
export const Hud = [c.HudLayer, c.Display]
export const Animation = [c.Animatable, c.Display]
export const Tween = [c.Tween]
