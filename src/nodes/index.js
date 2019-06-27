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
export const Child = [c.Parent]
export const ParentRelations = {
  Default: [c.Child.Default],
  Overlay: [c.Child.Overlay],
  Preview: [c.Child.Preview],
  Debug: [c.Child.Debug],
}

export const ParentWithOverlay = [c.Child.Overlay, c.Position]
export const ParentWithPreview = [c.Child.Preview, c.IsoPosition]
export const ParentWithDebug = [c.Child.Debug, c.IsoPosition]

export const BuildingWithDebug = [c.Child.Debug, c.Building, c.Position, c.IsoPosition, c.FSM, c.Identity]
export const PointerWithDebug = [c.Child.Debug, c.PointerContext, c.Position, c.IsoPosition, c.FSM]

// inventory
export const Inventory = [c.Inventory]
export const InventoryItem = [c.InventoryItem, c.EntityMeta, c.Position]
export const InventoryItemClicked = [c.InventoryItem, c.Clicked, c.Interact.Initiator, c.EntityMeta]
export const InventoryItemCounter = [c.InventoryCounter, c.Parent, c.Display]
export const InventoryItemSelected = [c.InventoryItem, c.Selected, c.EntityMeta]

// pointer
export const Pointer = [c.PointerContext, c.Position, c.IsoPosition]
export const PointerIdle = [c.PointerContext, c.Idle, c.Position]
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
export const TargetDropped = [c.Dropped, c.FSM, c.DragContext]

// interaction listeners
export const TargetDroppedListener = [c.Dropped, c.FSM, c.DragContext, c.Position, c.Collision]

// layers
export const Layers = {
  Ground: [c.Layer.Ground, c.Display],
  BackGround: [c.Layer.BackGround, c.Display],
  Building: [c.Layer.Building, c.Display],
  Drag: [c.Layer.Drag, c.Display],
  Hud: [c.Layer.Hud, c.Display],
  Debug: [c.Layer.Debug, c.Display],
}

// map layers
export const MapLayers = {
  Building: [c.Layer.Building, c.Identity, c.Position, c.Collision],
  Drag: [c.Layer.Drag, c.Identity, c.Position, c.Collision],
}

export const Debug = [c.Layer.Debug, c.Display]

// other
export const CameraControl = [c.Camera, c.Position, c.Motion, c.MotionControl, c.ZoomControl]
export const Camera = [c.Camera, c.Position]
export const Collision = [c.Position, c.Collision]
export const InBounds = [c.Layer.Building, c.Position, c.Collision]
export const Map = [c.Map]
export const Building = [c.Building, c.Position, c.Identity]
export const Input = [c.Input]
export const Animation = [c.Animatable, c.Display]
export const Tween = [c.Tween]
export const Preview = [c.Preview]
