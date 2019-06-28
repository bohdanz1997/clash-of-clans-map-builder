import { useNodes, onUpdate } from 'core/ecs'
import * as n from '../nodes'

/**
 * @param {Keyboard} keyboard
 * @param {PointerManager} pointers
 */
export const Input = ({ keyboard, pointers }) => {
  useNodes([n.Input])

  onUpdate((node, delta) => {
    keyboard.update(delta)
    pointers.update(delta)
  })
}
