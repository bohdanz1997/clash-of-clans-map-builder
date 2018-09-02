import render from './render'
import movement from './movement'
import syncMap from './syncMap'

export const registerSystems = (engine) => {
  [
    render,
    movement,
    syncMap,
  ].forEach(engine.addSystem)
}
