import dayjs from 'dayjs'
import { log } from './log-style'

const now = () => dayjs().format('HH:mm:ss.ms')

export const Log = ({ config }) => {
  const {
    levels = {},
    timestamp = true,
    enable = false,
  } = config.logger

  const handler = enable ? log : () => {}
  const time = () => (timestamp ? `[${now()}]` : '')

  return (level, ...args) => {
    if (levels[level]) {
      handler(`${time()} ${args.join(' ')}`)
    }
  }
}
