import { createSystem } from 'core/factories'
import { nRender } from '../nodes'
import priorities from './priorities'

export default $engine => createSystem(({ position, display }) => {
  const { sprite, group } = display

  sprite.parentGroup = group
  sprite.position.copy(position.pos)
})(nRender)($engine)

export const params = {
  priority: priorities.RENDER,
}
