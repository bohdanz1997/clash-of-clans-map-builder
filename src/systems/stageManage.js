import { createSystem } from '../core/factories'
import { nRender } from '../nodes'

export default ($engine, $app, $createLogger) => createSystem({
  init(node) {
    const logger = $createLogger('StageManageSystem')
    const addSpriteToStage = ({ display }) => $app.stage.addChild(display.sprite)
    node.each(addSpriteToStage)

    logger.log('added', node.size, 'render items')
  },
})(nRender)($engine)
