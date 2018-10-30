import {
  moduleLoader,
  jsFileNamesNormalizer,
} from './moduleLoaders'

export default (config) => {
  const {
    engine,
    ignoredFiles = [],
    defaultSystemPriority,
  } = config

  const defaultSystemParams = {
    priority: defaultSystemPriority,
    enabled: true,
  }

  const buildSystemFromContext = (context, meta) => {
    const {
      default: systemHandler,
      params = {},
    } = context

    const systemParams = {
      ...defaultSystemParams,
      ...params,
      ...meta,
    }

    return {
      ...systemParams,
      systemHandler,
    }
  }

  const systemsLoader = moduleLoader(
    jsFileNamesNormalizer,
    buildSystemFromContext,
  )

  const sortByPriority = (a, b) => a.priority - b.priority

  return (context) => {
    const systems = systemsLoader(context)

    Object
      .values(systems)
      .sort(sortByPriority)
      .filter(system => (
        system.enabled && !ignoredFiles.includes(system.name)
      ))
      .map(system => system.systemHandler)
      .map(engine.addSystem)
  }
}
