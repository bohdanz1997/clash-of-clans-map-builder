import dayjs from 'dayjs'

export class Logger {
  constructor({ config }) {
    this.handler = config.logs ? console.log : () => {}
  }

  write(...args) {
    this.handler(new Date(), ...args)
  }
}

const now = () => dayjs().format('HH:mm:ss.ms')

export const Log = ({ config }) => {
  const handler = config.logs ? console.log : () => {}

  return (...args) => {
    handler(`[${now()}]`, ...args)
  }
}
