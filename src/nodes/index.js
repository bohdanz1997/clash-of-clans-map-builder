import * as c from '../components'

export const nMovement = [c.cPosition, c.cMotion]
export const nPhysics = [c.cPosition, c.cMotion, c.cCollision]
export const nBoundsLimiter = [c.cPosition, c.cMotion, c.cControl, c.cCollision]
export const nRender = [c.cPosition, c.cDisplay]
export const nMap = [c.cMap]
export const nBuilding = [c.cBuilding, c.cPosition]
export const nWall = [c.Building, c.cWall, c.cPosition]
export const nInteract = [c.cInteract, c.cPosition]
export const nPlayerControl = [c.cControl, c.cMotion, c.cPlayer]
export const nEnemyControl = [c.cControl, c.cMotion, c.cBrain, c.cEnemy]
export const nInput = [c.cInput]
export const nCameraControl = [c.cCamera, c.cPosition, c.cMotion, c.cControl]

// layers:
// - ground
// - objects
export const nGroundLayer = [c.cDisplay, c.cGround]
export const nObjectsLayer = [c.cDisplay, c.cGameObject, c.cPosition]
