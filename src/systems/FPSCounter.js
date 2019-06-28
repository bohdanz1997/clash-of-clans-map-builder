import { Stats } from 'core/boot'

/**
 * @param {PIXI.utils.EventEmitter} events
 */
export const FPSCounter = ({ events }) => {
  const stats = new Stats([
    [0, 0, Stats.types.FPS],
    [0, 48, Stats.types.MB],
  ])

  events
    .on('preUpdate', stats.begin)
    .on('postUpdate', stats.end)
}
