import { onUpdate, useNodes } from 'core/ecs'
import * as n from '../nodes'

export const IsometricRender = () => {
  useNodes([n.IsoRender])

  onUpdate((node) => {
    const { isoPosition, display } = node
    display.sprite.x = isoPosition.x
    display.sprite.y = isoPosition.y
  })
}
