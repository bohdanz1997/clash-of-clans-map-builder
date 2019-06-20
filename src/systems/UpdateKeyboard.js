import * as n from '../nodes'

/**
 * @param {Keyboard} keyboard
 */
export const UpdateKeyboard = ({ keyboard }) => ({
  nodes: [n.Keyboard],

  init() {
    keyboard.start()
  },

  update(node, delta) {
    keyboard.update(delta)
  },
})
