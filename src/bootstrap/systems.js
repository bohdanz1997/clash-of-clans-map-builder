import {
  moduleLoader,
  jsFileNamesNormalizer,
} from 'core'

import priorities from '../systems/priorities'

const defaultSystemParams = {
  priority: priorities.UPDATE,
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
const mapSystemHandler = system => system.systemHandler

export default ({ engine, context, ignoredFiles = [] }) => {
  const systems = systemsLoader(context)

  Object
    .values(systems)
    .sort(sortByPriority)
    .filter(system => (
      system.enabled && !ignoredFiles.includes(system.name)
    ))
    .map(mapSystemHandler)
    .map(engine.addSystem)
}
