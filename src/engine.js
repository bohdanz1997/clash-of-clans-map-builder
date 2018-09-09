import { Engine } from 'scent'

import { resolver } from './inject'
import { objectEach } from './core/util'

import registerSystems from './registerSystems'
import registerEntities from './registerEntities'

import { nRender } from './nodes'

const engineInitializer = config => (engine, provide) => {
  const dependencies = resolver(config)
  objectEach(provide, dependencies)
}

const addRenderNodesToStage = (renderNodes, app) => {
  renderNodes.each(({ display }) => app.stage.addChild(display.sprite))
  console.log('engine: added', renderNodes.size, 'render nodes to stage')
}

export default (config, app) => {
  const engine = new Engine(engineInitializer(config))
  registerEntities(engine)
  registerSystems(engine)

  const renderNodes = engine.getNodeType(nRender)
  addRenderNodesToStage(renderNodes, app)

  return engine
}
