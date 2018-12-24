import { identity } from '../util'

export const moduleLoader = (fileNameReplacer, contextProvider = identity) => (
  (requireContext) => {
    const loadContext = (file) => {
      const context = requireContext(file)
      const name = fileNameReplacer(file)
      const meta = { name }
      return [
        name,
        contextProvider(context, meta),
      ]
    }

    const resultReducer = (acc, [name, context]) => ({
      ...acc,
      [name]: context,
    })

    return requireContext.keys()
      .map(loadContext)
      .reduce(resultReducer, {})
  }
)

export const jsonFileNamesNormalizer = x => x.replace(/(^.\/)|(\.json$)/g, '')
export const jsFileNamesNormalizer = x => x.replace(/(^.\/)|(\.js$)/g, '')

export const jsonModuleLoader = moduleLoader(jsonFileNamesNormalizer)

const jsContextMapper = context => context.default || context
export const jsModuleLoader = (context, contextMapper = jsContextMapper) => (
  moduleLoader(
    jsFileNamesNormalizer,
    contextMapper,
  )(context)
)
