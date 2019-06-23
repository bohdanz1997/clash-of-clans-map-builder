import { Renderer, Stage, Layer } from '../pixi'

/**
 * @param {Config} config
 * @return {Renderer}
 */
export const createRenderer = (config) => {
  const {
    antialias,
    resolution,
    transparent,
    width,
    height,
  } = config

  return new Renderer({
    width,
    height,
    antialias,
    resolution,
    transparent,
  })
}

const wrapWithLayers = groups => groups.map(group => new Layer(group))

/**
 * @param {Config} config
 * @return {Stage}
 */
export const createStage = (config) => {
  const stage = new Stage()
  const displayLayers = wrapWithLayers(Object.values(config.displayGroups))

  stage.group.enableSort = true
  stage.addChild(...displayLayers)
  stage.addChild(...config.display.containers)

  return stage
}
