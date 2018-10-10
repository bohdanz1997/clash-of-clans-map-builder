export const createLogger = (title = '') => ({
  log: (...args) => console.log(`[${title}]`, ...args),
})
