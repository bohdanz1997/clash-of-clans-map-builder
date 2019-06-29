import dayjs from 'dayjs'

const now = () => dayjs().format('HH:mm:ss.ms')

export const Log = ({ config }) => {
  const {
    levels = {},
    timestamp = true,
    enable = false,
  } = config.logger

  const handler = enable ? console.log : () => {}
  const time = () => (timestamp ? `[${now()}]` : '')

  return (level, ...args) => {
    if (levels[level]) {
      handler(time(), ...args)
    }
  }
}
