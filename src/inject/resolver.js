import { Keyboard } from '../core/input'

export default (config, app) => ({
  $app: app,
  $config: config,
  $keyboard: new Keyboard(config.target),
})
