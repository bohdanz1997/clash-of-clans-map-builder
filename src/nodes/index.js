import * as c from '../components'

// control
export const CameraControlNode = [
  c.cCamera,
  c.cPosition,
  c.cMotion,
  c.cMotionControl,
  c.cZoomControl,
]

export const DraggableNode = [
  c.cDraggable,
  c.cPosition,
  c.cDisplay,
  c.cCollision,
  c.cIdentity,
]

export const MovementNode = [c.cPosition, c.cMotion]
export const CollisionNode = [c.cPosition, c.cCollision]
export const RenderNode = [c.cPosition, c.cDisplay]
export const MapNode = [c.cMap]
export const BuildingNode = [c.cBuilding, c.cPosition, c.cIdentity]
export const KeyboardNode = [c.cKeyboard]
export const InteractiveNode = [c.cInteractive, c.cCollision]
export const PointerNode = [c.cPointer, c.cDragSource, c.cIdentity]
export const IsometricNode = [c.cPosition, c.cIsoPosition]
export const IsoRenderNode = [c.cIsoPosition, c.cDisplay]
export const OverlayOwnerNode = [c.cOverlayOwner, c.cPosition]
export const OverlayNode = [c.cOverlay, c.cPosition]
export const HudNode = [c.cHudLayer, c.cDisplay]
export const DeckNode = [c.cDeck]
export const DeckItemNode = [c.cDeckItem, c.cInteractive, c.cEntityMeta]

// layers
export const LayersNode = {
  Ground: [c.cGroundLayer, c.cDisplay],
  BackGround: [c.cBackGroundLayer, c.cDisplay],
  Building: [c.cBuildingLayer, c.cDisplay],
  Drag: [c.cDragLayer, c.cDisplay],
  Hud: [c.cHudLayer, c.cDisplay],
}

// map layers
export const MapLayersNode = {
  Building: [c.cBuildingLayer, c.cIdentity, c.cPosition, c.cCollision],
  Drag: [c.cDragLayer, c.cIdentity, c.cPosition, c.cCollision],
}
