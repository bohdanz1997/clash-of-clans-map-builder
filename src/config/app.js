import path from 'path'

const root = path.resolve(__dirname, '../')

export default {
  paths: {
    root,
    entities: path.resolve(root, 'entities'),
    systems: path.resolve(root, 'systems'),
  },
  dirs: {
    entities: './entities',
    systems: './systems',
  },
}
