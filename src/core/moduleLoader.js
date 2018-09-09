import { identity } from './util'

const moduleLoader = (fileNameReplacer, contextProvider = identity) => (
  (requireContext) => {
    const loadContext = file => ([
      fileNameReplacer(file),
      contextProvider(requireContext(file)),
    ])

    const resultReducer = (acc, [name, context]) => ({
      ...acc,
      [name]: context,
    })

    return requireContext.keys()
      .map(loadContext)
      .reduce(resultReducer, {})
  }
)

export const jsonModuleLoader = moduleLoader(
  x => x.replace(/(^.\/)|(\.json$)/g, '')
)

export const jsModuleLoader = moduleLoader(
  x => x.replace(/(^.\/)|(\.js$)/g, ''),
  context => context.default || context,
)
