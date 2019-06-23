export class Logger {
  constructor({ config }) {
    this.handler = config.debug ? console.log : () => {}
  }

  write(...args) {
    this.handler(...args)
  }
}

export const Log = ({ config }) => {
  const handler = config.debug ? console.log : () => {}

  return (...args) => {
    handler(...args)
  }
}
