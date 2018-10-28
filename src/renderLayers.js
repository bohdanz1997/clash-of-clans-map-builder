import { Group, Layer, Stage } from 'core/pixi'

const spriteSorting = {
  // sprites with greater 'y' go backward
  backward: sprite => sprite.zOrder = +sprite.y,
  // sprites with greater 'y' go forward
  forward: sprite => sprite.zOrder = -sprite.y,
}

const wrapWithLayers = _groups => _groups.map(group => new Layer(group))

const groups = {
  GROUND: new Group(0, false),
  OVERLAY: new Group(2, true),
  SHADOW: new Group(3, false),
  BUILDING: new Group(5, spriteSorting.forward),
  DRAG: new Group(10, false),
  HUD: new Group(20, false),
}

export const groupsList = Object.values(groups)

export const createStage = (_groups) => {
  const stage = new Stage()
  stage.group.enableSort = true
  stage.addChild(...wrapWithLayers(_groups))
  return stage
}

export default groups
