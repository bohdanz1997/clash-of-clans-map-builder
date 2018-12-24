
import { prop, capitalizeFirst } from 'core/util'
import {
  jsModuleLoader as loadJS,
  jsonModuleLoader as loadJSON,
  createSystemsLoader,
} from 'core/loaders'

export default class Ignitor {
  constructor(config) {
    const get = prop(config)

    this.basePath = get('paths.base', 'src')
    this.systemsFolder = get('paths.systems', 'systems')
    this.entitiesFolder = get('paths.entities', 'entities')
    this.assetsFolder = get('paths.assets', 'assets')
    this.entityAssetsFolder = `${this.assetsFolder}/entity`
    this.mapAssetsFolder = `${this.assetsFolder}/map`

    this.defaultSystemPriority = get('defaultSystemPriority', 0)
  }

  resolveEntities() {
    const entitiesPath = this.joinBasePath(this.entitiesFolder)
    const entitiesContext = require.context('./entities')
    const contextMapper = (context, meta) => (
      context[capitalizeFirst(meta.name)]
    )

    return loadJS(entitiesContext, contextMapper)
  }

  resolveMaps() {
    const entitiesPath = this.joinBasePath(this.entitiesFolder)
    const mapContext = require.context('../assets/map')
    return loadJSON(mapContext)
  }

  resolveEntityDefinitions() {
    const definitionsPath = this.joinBasePath(this.entityAssetsFolder)
    const definitionContext = require.context('../assets/entity')
    return loadJSON(definitionContext)
  }

  resolveSystems() {
    const systemsPath = this.joinBasePath(this.systemsFolder)

    const systemsLoader = createSystemsLoader({
      defaultSystemPriority: this.defaultSystemPriority,
    })

    const systemsContext = require.context('./systems')
    const systems = systemsLoader(systemsContext)

    return systems
  }

  joinBasePath(path) {
    return `${this.basePath}/${path}`
  }
}
