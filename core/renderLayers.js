import { Layer, Stage } from 'core/pixi'

export const sorting = {
  // sprites with greater 'y' go backward
  backward: sprite => sprite.zOrder = +sprite.y,
  // sprites with greater 'y' go forward
  forward: sprite => sprite.zOrder = -sprite.y,
}

const wrapWithLayers = groups => (
  groups.map(group => new Layer(group))
)

export const createStage = (groups) => {
  const stage = new Stage()
  stage.group.enableSort = true
  stage.addChild(...wrapWithLayers(Object.values(groups)))
  return stage
}
