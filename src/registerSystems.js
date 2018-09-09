import { jsModuleLoader } from './core'

const systems = jsModuleLoader(require.context('./systems'))
const sortByPriority = (a, b) => a.priority - b.priority

export default (engine) => (
  Object
    .values(systems)
    .map(engine.addSystem)
)
