import {
  moduleLoader,
  jsFileNamesNormalizer,
} from './moduleLoaders'

export const createSystemsLoader = (config) => {
  const {
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

    return Object
      .values(systems)
      .sort(sortByPriority)
      .filter(system => system.enabled)
  }
}

export default createSystemsLoader
