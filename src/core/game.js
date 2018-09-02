export default (engine) => {
  let prev = Date.now()
  const updateInterval = 100

  const getDelta = (() => {
    const trail = 0.001
    return (prev, now) => (now - prev) * trail
  })()

  engine.start()

  setInterval(() => {
    const now = Date.now()
    const delta = getDelta(prev, now)
    engine.update(delta)
    prev = now
  }, updateInterval)
}
