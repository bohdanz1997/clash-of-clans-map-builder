import { createSprite, createText } from 'core/factories'
import { makeIsoRectSprite, makeRectSprite } from 'core/graphics'
import { Display as DisplayComponent } from '../components'

const withDisplayComponent = ({ spriteFactory, parentId }) => entity => (
  entity.add(DisplayComponent({
    sprite: spriteFactory(),
    parentId,
  }))
)

export const withDisplay = ({
  sprite({ texture, width, height, parentId }) {
    return withDisplayComponent({
      spriteFactory: () => createSprite(texture, null, null, width, height),
      parentId,
    })
  },

  rect({ width, height, color, parentId }) {
    return withDisplayComponent({
      spriteFactory: () => makeRectSprite(width, height, color),
      parentId,
    })
  },

  isoRect({ width, height, color, parentId }) {
    return withDisplayComponent({
      spriteFactory: () => makeIsoRectSprite(width, height, color),
      parentId,
    })
  },

  text({ x, y, font, fillStyle, content, parentId }) {
    return withDisplayComponent({
      spriteFactory: () => createText({ x, y, font, fillStyle, content }),
      parentId,
    })
  },
})
