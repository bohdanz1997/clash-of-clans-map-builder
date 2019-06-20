import * as n from '../nodes'

/**
 * @param {TileMap} map
 * @param {Engine} engine
 * @param {EntityManager} entities
 */
export const ManageOverlays = ({ map, engine, entities }) => ({
  nodes: [n.Overlay, n.OverlayOwner],

  init(overlayNode, ownerNode) {
    ownerNode.each(this.createOverlay)
    ownerNode.onAdded(this.createOverlay)
    ownerNode.onRemoved(this.removeOverlay)
  },

  createOverlay({ position, collision }) {
    const sizeInPixels = collision.radius * map.config.cellWidth
    const overlay = entities.create('overlay', {
      width: sizeInPixels,
      height: sizeInPixels,
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
