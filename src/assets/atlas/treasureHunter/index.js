import data from './data'
import { makeAtlasFilePath, extractFrames } from '../util'

export const [
  blob,
  door,
  dungeon,
  expolorer,
  treasure,
] = extractFrames(data)

export const file = makeAtlasFilePath('treasureHunter')
