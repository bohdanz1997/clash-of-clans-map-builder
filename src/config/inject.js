import { Keyboard } from 'core/input'

import {
  createPositioning,
} from '../services'

export default (config, app, target) => ({
  $app: app,
  $config: config,
  $keyboard: new Keyboard(target),
  $world: app.stage.childByName('world'),
  $hud: app.stage.childByName('hud'),
  $positioning: createPositioning(config, app),
})
