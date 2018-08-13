import { createEngine } from "./engine"

const engine = createEngine()
const updateInterval = 500

engine.start()

setInterval(() => {
  engine.update()
}, updateInterval)
