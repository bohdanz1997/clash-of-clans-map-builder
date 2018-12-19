import { createComponent } from 'core/scent'

export const [cDeck, Deck] = createComponent(
  'deck', 'items selected',
  () => ({
    items: [],
    selected: null,
  })
)
