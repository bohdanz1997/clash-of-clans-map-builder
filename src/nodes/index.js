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
export const nBuilding = [c.cBuilding, c.cPosition]
export const nWall = [c.Building, c.cWall, c.cPosition]
export const nInteract = [c.cInteract, c.cPosition]
export const nInput = [c.cInput]
export const nDraggable = [c.cDraggable, c.cPosition, c.cDisplay, c.cCollision]
export const nPointer = [c.cPointer]
export const nIsometric = [c.cPosition, c.cIsoPosition]
export const nIsoRender = [c.cIsoPosition, c.cDisplay]
export const nBackGround = [c.cBackGround, c.cPosition]
export const nOverlay = [c.cOverlay, c.cPosition]

// layers:
export const nLayers = {
  Ground: [c.cDisplay, c.cGround],
  Building: [c.cDisplay, c.cBuilding],
  BackGround: [c.cDisplay, c.cBackGround],
}
