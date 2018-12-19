import { spriteFactory, textFactory } from 'core/display'
import { Display as DisplayComponent } from '../components'

const withDisplayComponent = ({ createSprite, parentId }) => entity => (
  entity.add(DisplayComponent({
    sprite: createSprite(),
    parentId,
  }))
)

export const withDisplay = ({
  sprite({ texture, width, height, parentId }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.create(texture, null, null, width, height),
      parentId,
    })
  },

  rect({ width, height, color, parentId }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.fromRect(width, height, color),
      parentId,
    })
  },

  isoRect({ width, height, color, parentId }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.isoFromRect(width, height, color),
      parentId,
    })
  },

  text({ x, y, font, fillStyle, content, parentId }) {
    return withDisplayComponent({
      createSprite: () => textFactory.create({ x, y, font, fillStyle, content }),
      parentId,
    })
  },
})
