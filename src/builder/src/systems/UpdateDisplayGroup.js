import { useNodes, onNodeAdded } from 'core/ecs'
import * as n from '../nodes'

const layerNodeTypes = Object.values(n.Layers)

export const UpdateDisplayGroup = () => {
  useNodes(layerNodeTypes)

  const setDisplayGroup = (node) => {
    node.display.sprite.parentGroup = node.layer.group
  }

  layerNodeTypes.forEach((nodeType) => {
    onNodeAdded(setDisplayGroup, nodeType)
  })
}
