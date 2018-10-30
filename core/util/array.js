export const flatArr = (...args) => args.reduce((acc, cur) => [...acc, ...cur], [])
