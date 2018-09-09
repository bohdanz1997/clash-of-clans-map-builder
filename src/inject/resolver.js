import { Keyboard } from '../core/input'
import { createLogger } from '../core'

export default (config, app) => ({
  $app: app,
  $config: config,
  $createLogger: createLogger,
  $keyboard: new Keyboard(config.target)
})
