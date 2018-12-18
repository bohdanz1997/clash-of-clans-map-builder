import { createComponent } from 'core/factories'

export const [cDeck, Deck] = createComponent(
  'deck', 'items selected',
  () => ({
    items: [],
    selected: null,
  })
)
