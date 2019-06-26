import * as n from '../nodes'

export const UpdateDisplayGroup = () => ({
  nodes: Object.values(n.Layers),

  init(...layerNodes) {
    const setDisplayGroup = (node) => {
      node.display.sprite.parentGroup = node.layer.group
    }

    const subscribe = (nodes) => {
      nodes.each(setDisplayGroup)
      nodes.onAdded(setDisplayGroup)
    }

    layerNodes.forEach(subscribe)
  },
})
