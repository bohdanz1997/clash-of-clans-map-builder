import * as s from './systems'

const systems = [
  s.stageManage,
  s.keyboardInput,
  s.movement,
  s.render,
  // s.syncMap,
]

export default (engine) => {
  systems.forEach(engine.addSystem)
}
