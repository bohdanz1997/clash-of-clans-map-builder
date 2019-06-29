export const css = (args, ...interpolations) => {
  const parsed = String(args[args.length - 1])
    .split('')
    .reduce((acc, char) => (['\n', ''].includes(char) ? acc : acc.concat(char)), '')
  return interpolations.concat(parsed)
}
