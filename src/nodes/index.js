import * as c from '../components'

// For future
// class NodeType {
//   entity = new Entity()
// }
//
// export class Movement extends NodeType {
//   position = c.Position
//   motion = c.Motion
// }

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
  DebugUI: [c.Child.DebugUI],
}

export const ParentWithOverlay = [c.Child.Overlay, c.Position]
export const ParentWithPreview = [c.Child.Preview, c.IsoPosition]
export const ParentWithDebug = [c.Child.Debug, c.IsoPosition]
export const ParentWithDebugUI = [c.Child.DebugUI, c.Position]

export const BuildingWithDebug = [c.Child.Debug, c.Building, c.Position, c.IsoPosition, c.FSM, c.Identity]
export const PointerWithDebug = [c.Child.Default, c.PointerContext, c.Position, c.IsoPosition, c.FSM]
export const CameraWithDebug = [c.Child.Default, c.Camera, c.Position]
export const UIWithDebug = [c.Child.DebugUI, c.UI, c.Position, c.FSM, c.Identity]

// 1. Building, Wall has c.Building
// 2. UI Elements (Button) has c.UI


// inventory
export const Inventory = [c.Inventory]
export const InventoryItem = [c.InventoryItem, c.EntityMeta, c.Position]
export const InventoryItemClicked = [c.InventoryItem, c.Clicked, c.Interact.Initiator, c.EntityMeta]
export const InventoryItemCounter = [c.InventoryCounter, c.Parent, c.Display]
export const InventoryItemSelected = [c.InventoryItem, c.Selected, c.EntityMeta]

// pointer
export const Pointer = [c.PointerContext, c.Position, c.IsoPosition]
export const PointerIdle = [c.PointerContext, c.Idle, c.Position, c.IsoPosition]
export const PointerHovered = [c.PointerContext, c.Hovered]

// interaction
export const Initiator = [c.PointerContext, c.FSM]
export const InitiatorIdle = [c.Idle, c.FSM, c.PointerContext, c.Position, c.IsoPosition]

export const Target = [c.Interactive, c.FSM]
export const TargetIdle = [...Target, c.Idle, c.Collision]
export const TargetHovered = [...Target, c.Hovered, c.Interact.Initiator]
export const TargetClicked = [...Target, c.Clicked, c.Interact.Initiator, c.Position]
export const TargetDragging = [...Target, c.Dragging, c.DragContext, c.Interact.Initiator, c.Position]
export const TargetSelected = [...Target, c.Selected, c.Interact.Initiator]
export const TargetDropped = [...Target, c.Dropped, c.DragContext]

export const UITarget = [c.UI, c.FSM]
export const UITargetIdle = [...UITarget, c.Idle, c.Collision, c.Display]
export const UITargetHovered = [...UITarget, c.Hovered, c.Interact.Initiator]
export const UITargetClicked = [...UITarget, c.Clicked, c.Interact.Initiator, c.Position]
export const UITargetDragging = [...UITarget, c.Dragging, c.DragContext, c.Interact.Initiator, c.Position, c.Display]
export const UITargetDropped = [...UITarget, c.Dropped, c.DragContext]

export const ButtonClicked = [...UITarget, c.Button, c.Clicked]
export const BuildingClicked = [...Target, c.Building, c.Clicked]
export const BuildingHovered = [...Target, c.Building, c.Hovered, c.Identity]
export const BuildingSelected = [...Target, c.Building, c.Selected, c.Display, c.Child.Overlay]

// interaction listeners
export const TargetDroppedListener = [...Target, c.Dropped, c.DragContext, c.Position, c.Collision]

// layers
export const Layers = {
  Ground: [c.Layer.Ground, c.Display],
  BackGround: [c.Layer.BackGround, c.Display],
  Building: [c.Layer.Building, c.Display],
  Drag: [c.Layer.Drag, c.Display],
  Hud: [c.Layer.Hud, c.Display],
  UI: [c.Layer.UI, c.Display],
  UIDrag: [c.Layer.UIDrag, c.Display],
  Debug: [c.Layer.Debug, c.Display],
}

// map layers
export const MapLayers = {
  Building: [c.Layer.Building, c.Identity, c.Position, c.Collision],
  Drag: [c.Layer.Drag, c.Identity, c.Position, c.Collision],
}

export const Debug = [c.Layer.Debug, c.Display]

export const SerializeBuilding = [c.Serializable, c.Building]
export const SerializeInventoryItem = [c.Serializable, c.InventoryItem]
export const Serializer = [c.Serializer]

// other
export const CameraControl = [c.Camera, c.Position, c.Motion, c.MotionControl, c.ZoomControl]
export const Camera = [c.Camera, c.Position]
export const Collision = [c.Position, c.Collision]
export const InBounds = [c.Layer.Building, c.Position, c.Collision]
export const Map = [c.Map]
export const Building = [c.Building, c.Position, c.Identity]
export const UI = [c.UI]
export const Input = [c.Input]
export const Animation = [c.Animatable, c.Display]
export const Tween = [c.Tween]
export const Preview = [c.Preview]
