import { useNodes, onUpdate } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'
import { LayoutManager } from '../services'
import { levels } from '../config'
import { layersDefaults } from '../layout'

/**
 * @param {TileMap} map
 * @param log
 */
const SerializeLayout = ({ map, log }) => {
  useNodes([n.Serializer, n.SerializeBuilding, n.SerializeInventoryItem])

  const serializeNodes = (nodes) => {
    const items = []

    nodes.each((node) => {
      const { serializable, entity } = node
      items.push(serializable.serialize(entity))
    })

    return items
  }

  onUpdate((serializers, buildings, inventoryItems) => {
    const serializer = serializers.head
    if (serializer) {

      const serializedData = {
        width: map.config.width,
        height: map.config.height,
        layers: [
          {
            name: 'ground',
            data: layersDefaults.ground,
          },
          {
            name: 'building',
            data: serializeNodes(buildings),
          },
          {
            name: 'drag',
            data: [],
          },
          {
            name: 'other',
            data: [
              ...layersDefaults.other,
              ...serializeNodes(inventoryItems),
            ],
          },
        ],
      }

      LayoutManager.save(serializedData)
      log(levels.layout, 'Save layout', serializedData)

      serializer.entity.dispose()
    }
  })
}

export const Serialize = [
  SerializeLayout,
]
