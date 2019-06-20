import { defComponent } from 'core/scent'

class DeckRaw {
  items = []
  selected = null
}

/** @type {DeckRaw} */
export const Deck = defComponent('deck', DeckRaw)
