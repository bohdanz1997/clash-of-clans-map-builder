import { createEngine } from "./core/engine"

const engine = createEngine()
const updateInterval = 500

engine.start()

setInterval(() => {
  engine.update()
}, updateInterval)
