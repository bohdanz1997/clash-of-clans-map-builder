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

export const BuildingChildMovement = [c.Relation.Child, c.Building, c.Position]
export const PointerChildMovement = [c.Relation.Child, c.PointerContext, c.IsoPosition]

// inventory
export const Inventory = [c.Inventory]
export const InventoryItem = [c.InventoryItem, c.EntityMeta, c.Position]
export const InventoryItemClicked = [c.InventoryItem, c.Clicked, c.Interact.Initiator, c.EntityMeta]
export const InventoryItemCounter = [c.InventoryCounter, c.Relation.Parent, c.Display]
export const InventoryItemSelected = [c.InventoryItem, c.Selected, c.EntityMeta]

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
export const TargetSelected = [c.Selected, c.FSM, c.Interact.Initiator]
export const TargetDropped = [c.Dropped, c.FSM, c.DragContext, c.Display]

// interaction listeners
export const TargetDroppedListener = [c.Dropped, c.FSM, c.DragContext, c.Position, c.Collision]

// layers
export const Layers = {
  Ground: [c.Layer.Ground, c.Display],
  BackGround: [c.Layer.BackGround, c.Display],
  Building: [c.Layer.Building, c.Display],
  Drag: [c.Layer.Drag, c.Display],
  Hud: [c.Layer.Hud, c.Display],
}

// map layers
export const MapLayers = {
  Building: [c.Layer.Building, c.Identity, c.Position, c.Collision],
  Drag: [c.Layer.Drag, c.Identity, c.Position, c.Collision],
}

// other
export const CameraControl = [c.Camera, c.Position, c.Motion, c.MotionControl, c.ZoomControl]
export const Collision = [c.Position, c.Collision]
export const InBounds = [c.Layer.Building, c.Position, c.Collision]
export const Map = [c.Map]
export const Building = [c.Building, c.Position, c.Identity]
export const Input = [c.Input]
export const Hud = [c.Layer.Hud, c.Display]
export const Animation = [c.Animatable, c.Display]
export const Tween = [c.Tween]
