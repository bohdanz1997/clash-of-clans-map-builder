const writeMsg = title => handler => (...args) => handler(`[${title}]`, ...args)

export const createLogger = (title = '') => {
  const logger = writeMsg(title)
  return {
    log: logger(console.log),
    warn: logger(console.warn),
    error: logger(console.error),
  }
}
