export const extractFrames = atlasData => (
  Object.keys(atlasData.frames)
)

export const makeAtlasFilePath = (name, fileName = 'data.json') => (
  `assets/atlas/${name}/${fileName}`
)
