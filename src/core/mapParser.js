export const parseLayer = (layerData, entityDefinitions) => {
  const getLevelDefinition = (entityDefinition, level) => (
    entityDefinition.levels
      ? entityDefinition.levels[level]
      : {}
  )

  const makeEntityParams = (entityLayerData) => {
    const { level, id } = entityLayerData

    const entityDefinition = entityDefinitions[id]
    if (!entityDefinition) {
      throw new Error(`Could not find entity definition for '${id}'`)
    }

    const levelDefinition = getLevelDefinition(entityDefinition, level)

    return {
      ...entityDefinition,
      ...levelDefinition,
      ...entityLayerData,
    }
  }

  return layerData.map(makeEntityParams)
}

export const parseMapDefinition = (mapDefinition) => {
  const { layers } = mapDefinition
  const layerNames = layers.map(l => l.name)
  return {
    ...mapDefinition,
    id: 'map',
    entityType: 'Map',
    layers: layerNames,
  }
}
