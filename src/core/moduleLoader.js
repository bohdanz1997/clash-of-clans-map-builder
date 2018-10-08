import { identity } from './util'

export const moduleLoader = (fileNameReplacer, contextProvider = identity) => (
  (requireContext) => {
    const loadContext = (file) => {
      const context = requireContext(file)
      return [
        fileNameReplacer(file),
        contextProvider(context),
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

export const jsModuleLoader = moduleLoader(
  jsFileNamesNormalizer,
  context => context.default || context,
)
