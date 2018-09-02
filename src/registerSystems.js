import {
  render,
  syncMap,
  movement,
  keyboardInput,
} from './systems'

const systems = [
  keyboardInput,
  render,
  movement,
  syncMap,
]

export default (engine) => {
  systems.forEach(engine.addSystem)
}
