import { Keyboard } from '../core/input'

export default (config) => ({
  $config: config,
  $keyboard: new Keyboard(config.target)
})
