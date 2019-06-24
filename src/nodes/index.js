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

// relations
export const Parent = [c.Relation.Child]
export const Child = [c.Relation.Parent, c.Position]

// inventory
export const InventoryItem = [c.InventoryItem, c.EntityMeta, c.Position]
export const InventoryItemClicked = [c.InventoryItem, c.Clicked, c.Interact.Initiator, c.EntityMeta]
export const InventoryItemCounter = [c.InventoryCounter, c.Relation.Parent, c.Display]

// pointer
export const Pointer = [c.PointerContext, c.Position, c.IsoPosition]
export const PointerHovered = [c.PointerContext, c.Hovered]

// interaction
export const Initiator = [c.PointerContext, c.FSM]
export const Target = [c.Interactive, c.FSM]
export const InitiatorIdle = [c.Idle, c.FSM, c.PointerContext, c.Position, c.IsoPosition]
export const TargetIdle = [c.Idle, c.FSM, c.Interactive, c.Collision]
export const TargetHovered = [c.Hovered, c.FSM, c.Interact.Initiator]
export const TargetClicked = [c.Clicked, c.FSM, c.Interact.Initiator, c.Position]
export const TargetDragging = [c.Dragging, c.FSM, c.DragContext, c.Interact.Initiator, c.Position]
export const TargetDropped = [c.Dropped, c.FSM, c.DragContext, c.Display]

// interaction listeners
export const TargetDroppedListener = [c.Dropped, c.FSM, c.DragContext, c.Position, c.Collision]

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
