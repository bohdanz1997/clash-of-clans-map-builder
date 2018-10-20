import 'colors'
import path from 'path'

const rootPath = path.resolve(__dirname, '../src')
const applyPathToRoot = _path => path.resolve(rootPath, _path)

export const folders = {
  root: rootPath,
  components: applyPathToRoot('components'),
  entities: applyPathToRoot('entities'),
  nodes: applyPathToRoot('nodes'),
  systems: applyPathToRoot('systems'),
}

export const generateFilePath = folder => name => path.resolve(folder, `${name}.js`)

export const pathGen = {
  component: generateFilePath(folders.components),
  entity: generateFilePath(folders.entities),
  node: generateFilePath(folders.nodes),
  system: generateFilePath(folders.systems),
}

export const capitalizeFirst = (str) => {
  const [first, ...rest] = str
  return `${first.toUpperCase()}${rest.join('')}`
}

export const argParser = {
  list: val => val.split(','),
}
