import render from './render'
import movement from './movement'
import syncMap from './syncMap'
import keyboardInput from './keyboardInput'

export const registerSystems = (engine) => {
  [
    keyboardInput,
    // render,
    // movement,
    // syncMap,
  ].forEach(engine.addSystem)
}
