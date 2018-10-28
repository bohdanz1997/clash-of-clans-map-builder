import * as c from '../components'

// control
export const nCameraControl = [
  c.cCamera,
  c.cPosition,
  c.cMotion,
  c.cMotionControl,
  c.cZoomControl,
]

export const nPlayerControl = [
  c.cPlayer,
  c.cMotion,
  c.cMotionControl,
]

export const nEnemyControl = [
  c.cEnemy,
  c.cMotion,
  c.cMotionControl,
]

export const nMovement = [c.cPosition, c.cMotion]
export const nCollision = [c.cPosition, c.cCollision]
export const nRender = [c.cPosition, c.cDisplay]
export const nMap = [c.cMap]
export const nBuilding = [c.cBuilding, c.cPosition, c.cIdentity]
export const nInput = [c.cInput]
export const nDraggable = [c.cDraggable, c.cPosition, c.cDisplay, c.cCollision, c.cIdentity]
export const nPointer = [c.cPointer]
export const nIsometric = [c.cPosition, c.cIsoPosition]
export const nIsoRender = [c.cIsoPosition, c.cDisplay]
export const nBackGround = [c.cBackGround, c.cPosition]
export const nOverlay = [c.cOverlay, c.cPosition]

// layers
export const nLayers = {
  Ground: [c.cGroundLayer, c.cDisplay],
  BackGround: [c.cBackGroundLayer, c.cDisplay],
  Building: [c.cBuildingLayer, c.cDisplay],
  Drag: [c.cDragLayer, c.cDisplay],
}

// map layers
export const nMapLayers = {
  Ground: [c.cGroundLayer, c.cIdentity, c.cPosition, c.cCollision],
  BackGround: [c.cBackGroundLayer, c.cIdentity, c.cPosition, c.cCollision],
  Building: [c.cBuildingLayer, c.cIdentity, c.cPosition, c.cCollision],
  Drag: [c.cDragLayer, c.cIdentity, c.cPosition, c.cCollision],
}
