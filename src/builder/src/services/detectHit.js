import { Point } from 'pixi.js'
import { CollisionChecker } from 'core/collision'
import * as c from '../components'

export const detectHit = (clientEntity, sourceEntity) => {
  const pointerPosition = clientEntity.get(c.Position)
  const pointerIsoPosition = clientEntity.get(c.IsoPosition)

  const isIso = sourceEntity.has(c.IsoPosition)
  const collision = sourceEntity.get(c.Collision)

  const pointerPos = isIso
    ? { x: pointerIsoPosition.cartX, y: pointerIsoPosition.cartY }
    : { x: pointerPosition.x, y: pointerPosition.y }

  return CollisionChecker.rect(collision.bounds, pointerPos)
}

export const detectHitNormal = (initiatorEntity, targetEntity) => {
  const initiatorIsoPos = initiatorEntity.get(c.IsoPosition)
  const collision = targetEntity.get(c.Collision)
  const pointerPos = new Point(initiatorIsoPos.cartX, initiatorIsoPos.cartY)

  return CollisionChecker.rect(collision.bounds, pointerPos)
}

export const detectHitUI = (initiatorEntity, targetEntity) => {
  const initiatorPos = initiatorEntity.get(c.Position)
  const collision = targetEntity.get(c.Collision)
  const pointerPos = new Point(initiatorPos.x, initiatorPos.y)

  return CollisionChecker.rect(collision.bounds, pointerPos)
}
