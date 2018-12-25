import { system } from 'core/scent'
import * as n from '../nodes'

export const KeyboardUpdate = ({ engine, keyboard }) => {
  keyboard.start()

  return system((node, delta) => {
    keyboard.update(delta)
  })(n.Keyboard)(engine)
}
