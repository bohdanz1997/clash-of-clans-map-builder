export const parseLayer = (layerData, entityDefinitions) => {
  const makeEntityParams = (entityLayerData) => {
    const { level, id } = entityLayerData

    const entityDefinition = entityDefinitions[id]
    if (!entityDefinition) {
      throw new Error(`Could not find entity definition for '${id}'`)
    }

    const levelDefinition = entityDefinition.levels[level]
    if (!levelDefinition) {
      throw new Error(`Could not find '${id}' level definition '${level}'`)
    }

    return {
      ...entityDefinition,
      ...levelDefinition,
      ...entityLayerData,
    }
  }

  return layerData.map(makeEntityParams)
}
