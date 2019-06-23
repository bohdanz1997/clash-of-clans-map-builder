export class Logger {
  constructor({ config }) {
    this.handler = config.debug ? console.log : () => {}
  }

  write(...args) {
    this.handler(...args)
  }
}
