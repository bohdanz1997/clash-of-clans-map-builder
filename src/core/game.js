export default (engine, app) => {
  engine.start()
  const gameLoop = initGameLoop(engine)
  app.ticker.add(gameLoop)
}

const initGameLoop = engine => (delta) => {
  engine.update(delta)
}
