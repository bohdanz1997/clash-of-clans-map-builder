import { Renderer } from 'pixi.js'
import { Stage, Layer } from 'core/pixi'

/**
 * @param {Config} config
 * @return {PIXI.Renderer}
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
 * @return {PIXI.display.Stage}
 */
export const createStage = (config) => {
  const stage = new Stage()
  const displayLayers = wrapWithLayers(Object.values(config.displayGroups))

  stage.group.enableSort = true
  stage.addChild(...displayLayers)
  stage.addChild(...config.display.containers)

  return stage
}
