import * as n from '../nodes'

/**
 * @param {TileMap} map
 * @param {Engine} engine
 * @param {EntityManager} entities
 */
export default ({ map, engine, entities }) => ({
  nodes: [n.Overlay, n.OverlayOwner],

  init(overlayNode, ownerNode) {
    ownerNode.each(this.createOverlay)
    ownerNode.onAdded(this.createOverlay)
    ownerNode.onRemoved(this.removeOverlay)
  },

  createOverlay({ position }) {
    const overlay = entities.create('overlay', {
      width: map.config.tileWidth,
      height: map.config.tileHeight,
      target: position,
    })

    engine.addEntity(overlay)
  },

  removeOverlay({ entity }) {
    entity.dispose()
  },

  update(overlayNode) {
    overlayNode.each(({ overlay, position }) => {
      position.x = overlay.target.x
      position.y = overlay.target.y
    })
  },
})
