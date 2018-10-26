import { Keyboard } from 'core/input'

export default (config, app, target) => ({
  $app: app,
  $config: config,
  $keyboard: new Keyboard(target),
  $world: app.stage.childByName('world'),
})
