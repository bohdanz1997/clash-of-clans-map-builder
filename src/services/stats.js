import Stats from 'stats-js'

export const createStats = () => {
  const stats = new Stats()
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.right = '0px'
  stats.domElement.style.top = '0px'

  document.body.appendChild(stats.domElement)
  return stats
}
