import {
  render,
  syncMap,
  movement,
  keyboardInput,
} from './systems'

const systems = [
  keyboardInput,
  movement,
  render,
  // syncMap,
]

export default (engine) => {
  systems.forEach(engine.addSystem)
}
