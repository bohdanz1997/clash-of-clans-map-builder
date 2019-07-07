// eslint-disable-next-line no-nested-ternary
export const keepInRanges = (min, max, val) => (val > max ? max : val < min ? min : val)
