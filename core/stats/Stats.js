import StatsFactory from 'stats-js/src/Stats'

const createStats = (offsetX, offsetY, panelId) => {
  const stats = new StatsFactory()

  stats.dom.style.left = 'initial'
  stats.dom.style.right = `${offsetX}px`
  stats.dom.style.top = `${offsetY}px`

  stats.showPanel(panelId)
  document.body.appendChild(stats.dom)

  return stats
}

export class Stats {
  static types = {
    FPS: 0,
    MS: 1,
    MB: 2,
    CUSTOM: 3,
  }

  constructor(config) {
    this.instances = config.map(([offsetX, offsetY, type]) => (
      createStats(offsetX, offsetY, type)
    ))
  }

  begin = () => {
    this.instances.forEach(instance => instance.begin())
  }

  end = () => {
    this.instances.forEach(instance => instance.end())
  }
}
