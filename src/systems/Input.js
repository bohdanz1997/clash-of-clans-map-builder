import * as n from '../nodes'

/**
 * @param {Input} keyboard
 * @param {PointerManager} pointers
 */
export const Input = ({ keyboard, pointers }) => ({
  nodes: [n.Input],

  update(node, delta) {
    keyboard.update(delta)
    pointers.update(delta)
  },
})
