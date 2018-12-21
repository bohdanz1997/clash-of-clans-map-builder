import { defComponent } from 'core/scent'

export const Deck = defComponent(
  'deck', 'items selected',
  () => ({
    items: [],
    selected: null,
  })
)
