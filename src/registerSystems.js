import {
  moduleLoader,
  systemPriorities,
  jsFileNamesNormalizer,
} from 'core'

const defaultSystemParams = {
  priority: systemPriorities.UPDATE,
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

const systems = systemsLoader(require.context('./systems'))

const sortByPriority = (a, b) => a.priority - b.priority
const onlyEnabled = system => system.enabled
const mapSystemHandler = system => system.systemHandler

export default engine => (
  Object
    .values(systems)
    .sort(sortByPriority)
    .filter(onlyEnabled)
    .map(mapSystemHandler)
    .map(engine.addSystem)
)
